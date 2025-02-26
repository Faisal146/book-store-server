import config from '../../config';
import AppError from '../../errors/AppError';
import { Tlogin } from './auth.interface';
import { createToken } from './auth.utils';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
  const emailExists = await User.findOne({ email: payload.email });

  if (emailExists) {
    throw new AppError(400, 'This email already exists');
  }
  const result = await User.create(payload);

  const userResponse = result.toObject();
  userResponse.password = '';

  return userResponse;
};

const loginUser = async (payload: Tlogin) => {
  const emailExists = await User.findOne({ email: payload.email });

  if (!emailExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This email does not exists');
  }

  const isBlocked = emailExists?.isBlocked;

  if (isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are blocked by admin');
  }

  //password check in bcrypt

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    emailExists.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(401, 'Invalid credentials');
  }

  //creating access token

  const jwtPayload = {
    email: payload.email,
    role: emailExists.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return accessToken;
};

const blockUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const unblockUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true },
  );
  return result;
};

export const authServices = {
  createUserIntoDB,
  loginUser,
  blockUser,
  unblockUser,
};

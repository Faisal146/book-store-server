import httpStatus from 'http-status';
import config from '../config';
import AppError from '../errors/AppError';
import { TuserRoles } from '../interface';
import { CustomRequest } from '../interface/customRequest';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: TuserRoles[]) => {
  return catchAsync(async (req: CustomRequest, res, next) => {
    const token = req.headers.authorization;
    //  const token = tokenWithBearer?.split(' ')[1];

    if (!token) {
      throw new AppError(500, 'you are not authorized');
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'invalid token');
    }

    const { role, email } = decoded;

    const user = await User.isEmailExists(email);

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }

    if (user?.isBlocked) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'This user is Blocked !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(500, 'you are not authorized');
    }

    //   console.log(decoded);

    req.user = decoded as JwtPayload;

    // console.log(req.user);

    next();
  });
};

export default auth;

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const result = await authServices.blockUser(req.params.id);

  sendResponse(res, {
    success: true,
    message: 'User Blocked Successfully',
    statusCode: 200,
    data: {
      token: result,
    },
  });
});

const unblockUser = catchAsync(async (req, res) => {
  const result = await authServices.unblockUser(req.params.id);

  sendResponse(res, {
    success: true,
    message: 'User unblocked successfully',
    statusCode: 200,
    data: {
      token: result,
    },
  });
});
export const authControllers = {
  createUser,
  loginUser,
  blockUser,
  unblockUser,
};

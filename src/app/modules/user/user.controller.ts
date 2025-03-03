import { CustomRequest } from '../../interface/customRequest';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB(req.query);

  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: 201,
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.getSingleUserFromDB(id);

  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: 201,
    data: result,
  });
});
const getSingleUserWithEmail = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.getSingleUserWithEmail(id);

  sendResponse(res, {
    success: true,
    message: 'User with email retrieved successfully',
    statusCode: 201,
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await userServices.UpdateUser(id, data);

  sendResponse(res, {
    success: true,
    message: 'User updated successfully',
    statusCode: 201,
    data: result,
  });
});

const addToCart = catchAsync(async (req: CustomRequest, res) => {
  const result = await userServices.addToCart(req.body, req.user);

  sendResponse(res, {
    success: true,
    message: 'added to cart',
    statusCode: 201,
    data: result,
  });
});
const removeItemFromCart = catchAsync(async (req: CustomRequest, res) => {
  const result = await userServices.removeItemFromCart(req.body, req.user);

  sendResponse(res, {
    success: true,
    message: 'removed from cart',
    statusCode: 201,
    data: result,
  });
});

export const userControllers = {
  getAllUser,
  getSingleUser,
  getSingleUserWithEmail,
  updateUser,
  addToCart,
  removeItemFromCart,
};

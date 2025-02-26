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

export const userControllers = {
  getAllUser,
  getSingleUser,
  updateUser,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CustomRequest } from '../../interface/customRequest';

const newOrder = async (req: CustomRequest, res: Response) => {
  try {
    const order = req.body;
    const user = req.user;

    const result = await orderServices.newOrderIntoDB(user, order);

    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'order is not created',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrdersFromDB(req.query);

    res.status(200).json({
      message: 'Orders fatched successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'order is not created',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await orderServices.getSingleOrderFromDB(id);

    res.status(200).json({
      message: 'Order is fatched successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'order is not created',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getUserOrders = catchAsync(async (req: CustomRequest, res) => {
  const user = req.user;
  const result = await orderServices.getUserOrders(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Your Orders fatched successfully',
    success: true,
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await orderServices.updateOrderInDB(req.body, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'This Order updated successfully',
    success: true,
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: CustomRequest, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await orderServices.deleteUserOrder(user, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Your Order deleted successfully',
    success: true,
    data: result,
  });
});

const totalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.totalRevenueDb();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue: result, // Total revenue calculated from all orders
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'somthing went wrong',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const orderController = {
  newOrder,
  totalRevenue,
  getAllOrders,
  deleteOrder,
  getUserOrders,
  getSingleOrder,
  updateOrder,
};

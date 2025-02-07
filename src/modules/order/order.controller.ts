import { Request, Response } from 'express';
import { orderServices } from './order.service';
import orderValidationSchema from './order.validation';

const newOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    const zodParsedData = orderValidationSchema.parse(order);
    const result = await orderServices.newOrderIntoDB(zodParsedData);

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
};

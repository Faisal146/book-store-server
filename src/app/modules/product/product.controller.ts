import { Request, Response } from 'express';
import ProductValidationSchema from './poduct.validation';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // validate with zod

    // save to database

    const result = await productServices.createProductIntoDB(req.file, product);

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Product is not created',
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProductsFromDB(req.query);

    res.status(200).json({
      message: 'All books fatched successfully',
      success: true,
      data: products,
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

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await productServices.getSingleProductsFromDB(productId);

    res.status(200).json({
      message: 'Book retrieved successfully',
      success: true,
      data: product,
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const result = await productServices.updateSingleProductsIntoDB(
      productId,
      updates,
    );

    res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
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
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteSingleProductsIntoDB(productId);

    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: {},
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

import { Request, Response } from "express";
import ProductValidationSchema from "./poduct.validation";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // validate with zod

    const zodParsedData = ProductValidationSchema.parse(product);

    // save to database

    const result = await productServices.createProductIntoDB(product);

    res.status(200).json({
      message: "Book created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Product is not created",
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProductsFromDB();

    res.status(200).json({
      message: "Book created successfully",
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Product is not created",
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
};

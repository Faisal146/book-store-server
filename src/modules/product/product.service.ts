import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  try {
    const result = await Product.create(product);
    return result;
  } catch (error) {
    return error;
  }
};

export const productServices = {
  createProductIntoDB,
};

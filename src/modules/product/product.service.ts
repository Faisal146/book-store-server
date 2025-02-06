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

const getAllProductsFromDB = async (term: string) => {
  try {
    if (term) {
      const result = await Product.find({
        $or: [
          { category: { $regex: term, $options: "i" } },
          { author: { $regex: term, $options: "i" } },
          { title: { $regex: term, $options: "i" } },
        ],
      });
      return result;
    } else {
      const result = await Product.find();
      return result;
    }
  } catch (error) {
    return error;
  }
};
const getSingleProductsFromDB = async (id: string) => {
  try {
    const result = await Product.findById(id);
    return result;
  } catch (error) {
    return error;
  }
};
const updateSingleProductsIntoDB = async (id: string, updates: any) => {
  try {
    const result = await Product.findByIdAndUpdate(
      id,
      { $set: { ...updates, updatedAt: Date.now() } },
      { new: true, runValidators: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};

const deleteSingleProductsIntoDB = async (id: string) => {
  try {
    const time = new Date();

    const result = await Product.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true, updatedAt: time } },
      { new: true, runValidators: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  updateSingleProductsIntoDB,
  deleteSingleProductsIntoDB,
};

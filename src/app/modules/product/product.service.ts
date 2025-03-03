import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (file: any, product: TProduct) => {
  try {
    const imageName =
      product.title +
      '-' +
      product.author +
      '-' +
      product.category +
      '-' +
      Date.now();

    const imageUrl = await sendImageToCloudinary(imageName, file);

    // console.log('imageurl is =>', imageUrl);

    if (imageUrl) {
      product.img = imageUrl;
    } else {
      product.img = '';
    }

    const result = await Product.create(product);
    return result;
  } catch (error) {
    return error;
  }
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const ProductSearchableFields = ['title', 'author', 'category'];

  const studentQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
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
      { ...updates },
      { new: true, runValidators: true },
    );
    return result;
  } catch (error) {
    throw new AppError(400, 'error updating');
  }
};

const deleteSingleProductsIntoDB = async (id: string) => {
  try {
    const time = new Date();

    const result = await Product.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true, updatedAt: time } },
      { new: true, runValidators: true },
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

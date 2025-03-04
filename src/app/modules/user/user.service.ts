import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from './user.model';

const getAllUserFromDB = async (query: Record<string, any>) => {
  const userSearchableFields = ['name', 'email', 'role'];

  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const result = User.findById(id);

  if (!result) {
    throw new AppError(404, 'user not found');
  }

  return result;
};
const getSingleUserWithEmail = async (email: string) => {
  const result = User.findOne({ email: email }).populate({
    path: 'cart.item',
    select: '_id title author price img',
  });

  if (!result) {
    throw new AppError(404, 'user not found');
  }

  return result;
};

const UpdateUser = async (id: string, data: any) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { ...data },
    { new: true, runValidators: true },
  );
  return result;
};

const addToCart = async (data: any, userData: any) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await User.findByIdAndUpdate(
    user._id,
    { $addToSet: { cart: { ...data } } },
    { new: true },
  );
  return result;
};

const removeItemFromCart = async (item: any, data: any) => {
  // const user = await User.findOne({ email: data.email });
  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  // }
  // console.log('deleting');

  const result = await User.findOneAndUpdate(
    { email: data.email },
    {
      $pull: { cart: { item: item.item } },
    },
    { new: true },
  );

  // console.log('deleitng');
  // console.log(item.item);

  return result;
};

export const userServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  getSingleUserWithEmail,
  UpdateUser,
  addToCart,
  removeItemFromCart,
};

/**
 * cart - user, product, quantity
 * order - products
 */

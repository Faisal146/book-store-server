import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from './user.model';

const getAllUserFromDB = async (query: Record<string, any>) => {
  const userSearchableFields = ['name', 'email', 'role'];

  const userQuery = new QueryBuilder(
    User.find(),

    query,
  )
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
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

const UpdateUser = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const result = await User.findByIdAndUpdate(id, { ...data }, { new: true });
  return result;
};

export const userServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  UpdateUser,
};

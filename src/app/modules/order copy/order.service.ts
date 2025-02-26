import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import QueryBuilder from '../../builder/QueryBuilder';

const newOrderIntoDB = async (user, orderData: TOrder) => {
  const { product, quantity } = orderData;

  // Find the user

  const userData = await User.findOne({ email: user.email });

  if (!userData) {
    throw new AppError(404, 'user not found');
  }

  // Find the book by ID

  const book = await Product.findById(product);
  if (!book) {
    throw new Error('Book not found');
  } else if (book.quantity < quantity) {
    throw new Error('Insufficient stock available');
  }

  book.quantity -= quantity;

  // calculate total price

  orderData.totalPrice = quantity * book.price;

  // insert user id

  orderData.user = userData._id;

  if (book.quantity === 0) {
    book.inStock = false;
  }

  await book.save(); // Save updated book

  const orderResult = await Order.create(orderData);

  return orderResult;
};

const getUserOrders = async (user) => {
  console.log(user.email);

  const userData = await User.findOne({ email: user.email });

  const result = await Order.find({ user: userData?._id });

  return result;
};
const deleteUserOrder = async (user, id: string) => {
  console.log(user, id);

  const userData = await User.findOne({ email: user.email });
  const order = await Order.findById(id);

  //  get is the order belogs to this user

  if (String(userData?._id) != String(order?.user)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'this is not your order');
  }
  const result = await Order.findByIdAndDelete(id);

  return result;
};

const getAllOrdersFromDB = async (query: Record<string, any>) => {
  const userSearchableFields = ['name', 'email', 'role'];

  const orderQuery = new QueryBuilder(
    Order.find(),

    query,
  )
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery
    .populate('product')
    .populate('user');

  return {
    meta,
    result,
  };
};

const totalRevenueDb = async () => {
  const totalRevenue = await Order.aggregate([
    {
      $lookup: {
        from: 'products', // Collection to join with
        localField: 'product', // Field in orders
        foreignField: '_id', // Field in books
        as: 'bookDetails',
      },
    },
    { $unwind: '$bookDetails' }, // make a bookDetails array
    {
      $group: {
        _id: null, // Group all orders
        totalRevenue: {
          $sum: { $multiply: ['$quantity', '$bookDetails.price'] },
        },
      },
    },
  ]);

  // console.log(totalRevenue);

  // console.log(totalRevenue);

  // If no orders exist, return 0

  return totalRevenue ? totalRevenue[0].totalRevenue : 0;
};

export const orderServices = {
  newOrderIntoDB,
  totalRevenueDb,
  getAllOrdersFromDB,
  getUserOrders,
  deleteUserOrder,
};

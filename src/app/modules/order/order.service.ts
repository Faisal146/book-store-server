import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { payment } from '../../utils/payment';

const newOrderIntoDB = async (user: any, orderData: TOrder) => {
  // console.log(user);
  //  console.log(orderData);

  //if (orderData.payment_method !== 'online') {
  let allTotalPrice = 0;
  let totalQuantity = 0;
  let error = null;

  await Promise.all(
    orderData.products.map(async (item) => {
      // Find the book by ID

      const book = await Product.findById(item.product);
      if (!book) {
        throw new Error(`Book not found ${item.product}`);
      } else if (book.quantity < item.quantity) {
        error = `insaficient stock available of ${book.title}`;
      }

      // reduce form stock

      book.quantity -= item.quantity;

      // false the in stock if quantity is 0

      if (book.quantity === 0) {
        book.inStock = false;
      }
      // calculate total price

      item.totalPrice = item.quantity * book.price;

      await book.save();

      allTotalPrice += item.totalPrice;
      totalQuantity += item.quantity;

      // console.log(item.totalPrice);
      // console.log(item.quantity);
    }),
  );

  if (error) {
    throw new AppError(403, error);
  }

  const userData = await User.findOne({ email: user.email });

  if (!userData) {
    throw new AppError(404, 'user not found');
  }

  // orderData.user = new Types.ObjectId(userData._id);

  orderData.user = userData._id as any;
  orderData.totalPrice = allTotalPrice;
  orderData.totalQuantity = totalQuantity;

  // console.log(orderData);

  //   const { product, quantity } = orderData;

  //   // Find the user

  //   const userData = await User.findOne({ email: user.email });

  //   if (!userData) {
  //     throw new AppError(404, 'user not found');
  //   }

  //   // Find the book by ID

  //   const book = await Product.findById(product);
  //   if (!book) {
  //     throw new Error('Book not found');
  //   } else if (book.quantity < quantity) {
  //     throw new Error('Insufficient stock available');
  //   }

  //   book.quantity -= quantity;

  //   // calculate total price

  //   orderData.totalPrice = quantity * book.price;

  //   // insert user id

  //   orderData.user = userData._id;

  //   if (book.quantity === 0) {
  //     book.inStock = false;
  //   }

  //   await book.save(); // Save updated book

  if (orderData.payment_method !== 'online') {
    const orderResult = await Order.create(orderData);
    return orderResult;
  } else {
    const payment_url = await payment(orderData);
    console.log(payment_url);
  }
};

const getUserOrders = async (user: any) => {
  const userData = await User.findOne({ email: user.email });

  const result = await Order.find({ user: userData?._id })
    .populate({
      path: 'products.product',
      select: '_id title author price',
    })
    .populate({
      path: 'user',
      select: '_id name email',
    });

  return result;
};
const deleteUserOrder = async (user: any, id: string) => {
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
  const userSearchableFields = ['name', 'email'];

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
    .populate({
      path: 'products.product',
      select: '_id title author price',
    })
    .populate({
      path: 'user',
      select: '_id name email',
    });

  return {
    meta,
    result,
  };
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id)
    .populate({
      path: 'products.product',
      select: '_id title author price',
    })
    .populate({
      path: 'user',
      select: '_id name email',
    });

  return result;
};

const updateOrderInDB = async (data: any, id: string) => {
  try {
    const result = await Order.findByIdAndUpdate(id, { ...data });

    return result;
  } catch {
    throw new AppError(httpStatus.BAD_REQUEST, 'update faild');
  }
};

const totalRevenueDb = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null, // Group all documents together
        totalRevenue: { $sum: '$totalPrice' }, // Sum all totalPrice values
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the output
        totalRevenue: 1, // Include only the totalRevenue field
      },
    },
  ]);

  // // If no orders exist, return 0
  // const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

  // console.log('Total Revenue:', 'totalRevenue');
  // console.log('hello world');
  // return ;

  // const totalRevenue = await Order.find({
  //   $group: {
  //     _id: null, // Group all orders
  //     totalRevenue: {
  //       $sum: 'totalPrice',
  //     },
  //   },
  // });

  // console.log(totalRevenue);

  // console.log(totalRevenue);

  // If no orders exist, return 0
  // console.log(totalRevenue);

  return result;
};

export const orderServices = {
  newOrderIntoDB,
  totalRevenueDb,
  getAllOrdersFromDB,
  getUserOrders,
  deleteUserOrder,
  getSingleOrderFromDB,
  updateOrderInDB,
};

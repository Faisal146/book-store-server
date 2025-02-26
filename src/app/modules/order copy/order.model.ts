import mongoose from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new mongoose.Schema<TOrder>({
  email: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number },
  placed: { type: Boolean, default: false },
  address: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Order: mongoose.Model<TOrder> = mongoose.model(
  'Order',
  orderSchema,
);

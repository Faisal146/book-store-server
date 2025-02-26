import mongoose from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new mongoose.Schema<TOrder>({
  email: { type: String, required: true },
  products: [
    {
      name: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
      totalPrice: { type: Number },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalQuantity: { type: Number },
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

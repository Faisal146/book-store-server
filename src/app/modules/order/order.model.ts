import mongoose from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new mongoose.Schema<TOrder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
      totalPrice: { type: Number, default: 0 },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  totalQuantity: { type: Number },
  totalPrice: { type: Number },
  paid: { type: Boolean },
  payment_method: { type: String },
  status: { type: String, default: 'placed' },
  address: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Order: mongoose.Model<TOrder> = mongoose.model(
  'Order',
  orderSchema,
);

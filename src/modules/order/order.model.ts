import mongoose from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new mongoose.Schema<TOrder>({
  email: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Order: mongoose.Model<TOrder> = mongoose.model(
  "Order",
  orderSchema
);

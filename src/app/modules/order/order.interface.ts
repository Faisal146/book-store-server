import { ObjectId } from 'mongoose';

export type TOrder = {
  name: string;
  email: string;
  products: {
    product: ObjectId;
    quantity: number;
    totalPrice?: number;
  }[];
  totalQuantity?: number;
  totalPrice?: number;
  user?: ObjectId;
  paid: boolean;
  payment_method: string;
  status: string;
  address: object;
  createdAt: Date;
  updatedAt: Date;
};

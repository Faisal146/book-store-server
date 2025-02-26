import { ObjectId } from 'mongoose';

export type TOrder = {
  email: string;
  products: {
    name: ObjectId;
    quantity: number;
    totalPrice?: number;
  }[];
  totalQuantity?: number;
  totalPrice?: number;
  user?: ObjectId;
  placed: boolean;
  address: object;
  createdAt: Date;
  updatedAt: Date;
};

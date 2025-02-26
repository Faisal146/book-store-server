import { ObjectId } from 'mongoose';

export type TOrder = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice?: number;
  user?: ObjectId;
  placed: boolean;
  address: object;
  createdAt: Date;
  updatedAt: Date;
};

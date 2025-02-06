export type TOrder = {
  email: string;
  product: any;
  quantity: number;
  totalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
};

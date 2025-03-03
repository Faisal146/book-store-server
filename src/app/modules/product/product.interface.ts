export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  img: string;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
};

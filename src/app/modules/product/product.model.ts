import { Schema, model, connect } from 'mongoose';
import { TProduct } from './product.interface';

// creating a schema

const ProductSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  img: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// creating a model

ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Product = model<TProduct>('Product', ProductSchema);

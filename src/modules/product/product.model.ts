import { Schema, model, connect } from "mongoose";
import { TProduct } from "./product.interface";

// creating a schema

const ProductSchema = new Schema<TProduct>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// creating a model

export const Product = model<TProduct>("Product", ProductSchema);

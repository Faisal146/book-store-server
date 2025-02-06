import mongoose from "mongoose";
import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const newOrderIntoDB = async (orderData: TOrder) => {
  const { email, product, quantity, totalPrice } = orderData;

  // Find the book by ID

  if (mongoose.Types.ObjectId.isValid(product)) {
    const book = await Product.findById(product);
    if (!book) {
      throw new Error("Book not found");
    } else if (book.quantity < quantity) {
      throw new Error("Insufficient stock available");
    }

    book.quantity -= quantity;
    if (book.quantity === 0) {
      book.inStock = false;
    }

    await book.save(); // Save updated book
  } else {
    throw new Error("Invalid product ID");
  }

  const orderResult = await Order.create(orderData);

  return orderResult;
};

const totalRevenueDb = async () => {
  const totalRevenue = await Order.aggregate([
    {
      $lookup: {
        from: "products", // Collection to join with
        localField: "product", // Field in orders
        foreignField: "_id", // Field in books
        as: "bookDetails",
      },
    },
    { $unwind: "$bookDetails" }, // Flatten bookDetails array
    {
      $group: {
        _id: null, // Group all orders
        totalRevenue: {
          $sum: { $multiply: ["$quantity", "$bookDetails.price"] },
        },
      },
    },
  ]);

  // If no orders exist, return 0
  const revenue = totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

  return revenue;
};

export const orderServices = {
  newOrderIntoDB,
  totalRevenueDb,
};

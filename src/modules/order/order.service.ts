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
  // const totalRevenue = await Order.aggregate([
  //   {
  //     $lookup: {
  //       from: "products", // Collection to join with
  //       localField: "product", // Field in orders
  //       foreignField: "_id", // Field in books
  //       as: "bookDetails",
  //     },
  //   },
  //   { $unwind: "$bookDetails" }, // make a bookDetails array
  //   {
  //     $group: {
  //       _id: null, // Group all orders
  //       totalRevenue: {
  //         $sum: { $multiply: ["$quantity", "$bookDetails.price"] },
  //       },
  //     },
  //   },
  // ]);

  // const totalRevenue = await
  Order.aggregate([
    {
      $lookup: {
        from: "products", // The collection to join with
        localField: "product", // Field from the orders collection
        foreignField: "_id", // Field from the products collection
        as: "productDetails", // Output array field
      },
    },
    {
      $unwind: "$productDetails", // Unwind the productDetails array
    },
    {
      $addFields: {
        totalProductPrice: {
          $multiply: ["$quantity", "$productDetails.price"],
        }, // Calculate total price for each product
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalRevenue: { $sum: "$totalProductPrice" }, // Sum up the total revenue
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field from the output
        totalRevenue: 1, // Include only the totalRevenue field
      },
    },
  ])
    .then((result) => {
      console.log("Total Revenue:", result[0]?.totalRevenue || 0);
    })
    .catch((err) => {
      console.error("Error calculating total revenue:", err);
    });
  // console.log(totalRevenue);

  // If no orders exist, return 0

  return 0;
};

export const orderServices = {
  newOrderIntoDB,
  totalRevenueDb,
};

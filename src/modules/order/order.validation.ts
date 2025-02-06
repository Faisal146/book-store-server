import z from "zod";

const orderValidationSchema = z.object({
  email: z.string(),
  product: z.string(),
  quantity: z.number().max(10, { message: "You cannot order more than 10" }),
  totalPrice: z.number().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export default orderValidationSchema;

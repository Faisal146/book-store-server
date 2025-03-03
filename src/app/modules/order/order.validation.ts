import z from 'zod';

const orderValidationSchema = z.object({
  name: z.string(),
  email: z.string(),
  products: z
    .array(
      z.object({
        product: z.string(),
        quantity: z
          .number()
          .max(10, { message: 'You cannot order more than 10' }),
        totalPrice: z.number().optional(),
      }),
    )
    .max(10, { message: 'You cannot order more than 10 books' }),
  totalQuantity: z.number().optional(),
  user: z.string().optional(),
  totalPrice: z.number().optional(),
  paid: z.boolean(),
  payment_method: z.string(),
  status: z.string().optional(),
  address: z.object({
    division: z.string(),
    district: z.string(),
    upazila: z.string(),
    area: z.string(),
  }),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export default orderValidationSchema;

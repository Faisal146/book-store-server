import z from 'zod';

const orderValidationSchema = z.object({
  email: z.string(),
  product: z.string(),
  quantity: z.number().max(10, { message: 'You cannot order more than 10' }),
  user: z.string().optional(),
  totalPrice: z.number().optional(),
  placed: z.boolean().optional(),
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

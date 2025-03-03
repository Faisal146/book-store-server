import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string().max(20, 'maximam length in 20 charecter'),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  cart: z
    .array(
      z.object({
        item: z.string(),
        quantity: z.number().optional(),
      }),
    )
    .optional(),
  isDeleted: z.boolean().optional(),
});

const UpdateUserValidationSchema = z.object({
  name: z.string().max(20, 'maximam length in 20 charecter').optional(),
  email: z.string().optional(),

  role: z.string().optional(),
});

export const userValidations = {
  createUserValidationSchema,
  UpdateUserValidationSchema,
};

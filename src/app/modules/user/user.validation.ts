import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string().max(20, 'maximam length in 20 charecter'),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const userValidations = {
  createUserValidationSchema,
};

import z from 'zod';

const CreateProductValidationSchema = z.object({
  title: z
    .string()
    .max(50, { message: 'Title must be at most 50 characters long' })
    .min(3, { message: 'Title must be at least 3 characters long' }),

  author: z
    .string()
    .min(2, { message: 'Author name must be at least 2 characters long' })
    .max(100, { message: 'Author name is too long' }),

  price: z
    .number()
    .min(1, { message: 'Price must be at least $1' })
    .max(10000, { message: 'Price cannot exceed $10,000' }),

  category: z.enum(
    [
      'Fiction',
      'Story',
      'Romantic',
      'Science',
      'SelfDevelopment',
      'Poetry',
      'Religious',
    ],
    {
      errorMap: () => ({
        message:
          'Invalid category. Choose a valid category: Fiction, Science, SelfDevelopment, Poetry, or Religious',
      }),
    },
  ),

  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(1000, { message: 'Description cannot exceed 1000 characters' }),

  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be negative' })
    .max(1000, { message: 'Quantity cannot exceed 1000 items' }),

  inStock: z.boolean().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

const UpdateProductValidationSchema = z.object({
  title: z
    .string()
    .max(50, { message: 'Title must be at most 50 characters long' })
    .min(3, { message: 'Title must be at least 3 characters long' })
    .optional(),

  author: z
    .string()
    .min(2, { message: 'Author name must be at least 2 characters long' })
    .max(100, { message: 'Author name is too long' })
    .optional(),

  price: z
    .number()
    .min(1, { message: 'Price must be at least $1' })
    .max(10000, { message: 'Price cannot exceed $10,000' })
    .optional(),

  category: z
    .enum(
      [
        'Fiction',
        'Story',
        'Romantic',
        'Science',
        'SelfDevelopment',
        'Poetry',
        'Religious',
      ],
      {
        errorMap: () => ({
          message:
            'Invalid category. Choose a valid category: Fiction, Science, SelfDevelopment, Poetry, or Religious',
        }),
      },
    )
    .optional(),

  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(1000, { message: 'Description cannot exceed 1000 characters' })
    .optional(),

  quantity: z
    .number()
    .min(0, { message: 'Quantity cannot be negative' })
    .max(1000, { message: 'Quantity cannot exceed 1000 items' })
    .optional(),

  inStock: z.boolean().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const ProductValidationSchemas = {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
};

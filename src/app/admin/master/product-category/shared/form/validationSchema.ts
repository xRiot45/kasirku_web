import { z } from 'zod';

export const validationSchema = z.object({
  product_category_name: z
    .string()
    .min(2, 'Product category name is required!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

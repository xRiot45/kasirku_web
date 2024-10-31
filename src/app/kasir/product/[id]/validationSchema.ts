import { z } from 'zod';

export const validationSchema = z.object({
  productId: z.string().min(2, 'Product Id is required!'),
  selected_variant: z.string().min(2, 'Selected Variant is required!'),
  quantity: z.string().min(2, 'Quantity required!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

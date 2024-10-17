import { z } from 'zod';

export const validationSchema = z.object({
  role_name: z.string().min(2, 'Form role is required!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

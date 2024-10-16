import { z } from 'zod';

export const validationSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;
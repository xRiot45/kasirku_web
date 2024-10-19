import { z } from 'zod';

export const validationSchema = z.object({
  email: z.string().min(2, 'Email is required!'),
  full_name: z.string().min(2, 'Full name is required!'),
  roleId: z.string().min(2, 'Role is required!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

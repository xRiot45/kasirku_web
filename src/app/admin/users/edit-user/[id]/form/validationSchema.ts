import { z } from 'zod';

export const validationSchema = z.object({
  full_name: z.string().min(2, 'Full name is required!'),
  birthday_date: z.date(),
  place_of_birth: z.string().min(2, 'Place of birth is required!'),
  phone_number: z.string().min(2, 'Phone number is required!'),
  gender: z.string().min(2, 'Gender is required!'),
  address: z.string().min(2, 'Address is required!'),
  photo: z.any(),
  roleId: z.string().min(2, 'Role is required!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

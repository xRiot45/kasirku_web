import { z } from 'zod';

export const validationSchema = z.object({
  payment_amount: z.number(),
  seat_number: z.string().min(1, 'Seat number is required!'),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string({
    error: "Firstname is required"
  }).min(2, 'Firstname must be at least 2 characters').max(50, 'Firstname cannot exceed 50 characters'),

  lastName: z.string({
    error: "Lastname is required"
  }).min(2, 'Lastname must be at least 2 characters').max(50, 'Lastname cannot exceed 50 characters'),

  email: z.email('A valid email is required'),
  
  password: z.string({
    error: "Password is required"
  }).min(8, 'Password must be at least 8 characters').max(100, 'Password cannot exceed 100 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})
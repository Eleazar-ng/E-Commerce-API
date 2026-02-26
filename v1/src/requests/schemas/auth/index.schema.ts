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

export const resendCodeSchema = z.object({
  email: z.email('A valid email is required'),
  type: z.enum(["email_verification", "password_reset"])
})

export const verifyEmailSchema = z.object({
  email: z.email('A valid email is required'),
  code: z.string({
    error: "Verification code is required"
  }).length(6, "Verification code must be 6 digits").regex(/^\d{6}$/, "Verification code must contain only digits")
})

export const signinSchema = z.object({
  email: z.email('A valid email is required'),
  password: z.string({
    error: "Password is required"
  }).min(8, 'Password must be at least 8 characters').max(100, 'Password cannot exceed 100 characters')
})

export const forgotPasswordSchema = z.object({
  email: z.email('A valid email is required'),
})

export const resetPasswordSchema = z.object({
  email: z.email('A valid email is required'),
  
  code: z.string({
    error: "Verification code is required"
  }).length(6, "Verification code must be 6 digits").regex(/^\d{6}$/, "Verification code must contain only digits"),

  password: z.string({
    error: "Password is required"
  }).min(8, 'Password must be at least 8 characters').max(100, 'Password cannot exceed 100 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})

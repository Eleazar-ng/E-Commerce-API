import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .max(100, 'Product name cannot exceed 100 characters')
    .transform(name => name.trim()),
  
  description: z.string()
    .min(1, 'Product description is required')
    .max(2000, 'Description cannot exceed 2000 characters')
    .transform(desc => desc.trim()),
  
  price: z.coerce.number({
    error: () => {
      return { message: "Price is required & must be a number"}
    }
  })
  .positive('Price must be a positive number')
  .multipleOf(0.01, "Price must have at most 2 decimal places"),

  category: z.enum(['electronics', 'fashion', 'home', 'books', 'others', 'health & fitness', 'groceries', 'Automobile'], {
    error: () => {
      return { message: "Invalid category, kindly select a valid category"}
    }
  }),

  stock: z.coerce.number({
    error: () => {
      return { message: "Stock is required & must be a number"}
    }
  })
  .positive('Stock must be a positive number'),

  isFeatured: z.boolean().default(false)
})

export const productsSchema = z.object({
  page: z.coerce.number({
    error: () => {
      return { message: "Page must be a number"}
    }
  }).optional(),
  limit: z.coerce.number({
    error: () => {
      return { message: "Limit must be a number"}
    }
  }).optional(),
  sort: z.string().optional(),
  search: z.string().optional()
})

export const productSchema = z.object({
  id: z.string()
})

export const productImagesSchema = z.object({
  ids: z.array(z.string())
  .min(1, "At least 1 product image is required")
  .max(5, "Exceeded maximum of 5 images")
})
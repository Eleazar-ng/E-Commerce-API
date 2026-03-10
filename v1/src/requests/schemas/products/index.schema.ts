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
  }),
  // .int()
  // .nonnegative('Stock must be a non-negative integer')
  // .or(z.string().transform(val => parseInt(val))),
    
  // images: z.array(z.url('Invalid image URL'))
  //   .min(1, 'At least one image is required')
  //   .max(10, 'Maximum 10 images allowed'),
    
  isFeatured: z.boolean().default(false)
})
import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces";

const imageSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  uploadedAt:{
    type: Date,
    default: Date.now
  }
})

const productSchema: Schema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Kindly provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Kindly provide product description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Kindly provide product price'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Kindly provide product category'],
    enum: ['electronics', 'fashion', 'home', 'books', 'others', 'health & fitness', 'groceries', 'Automobile']
  },
  stock: {
    type: Number,
    required: [true, 'Kindly provide product stock'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  images: [imageSchema],
  isFeatured: {
    type: Boolean,
    default: false
  },
},{
  timestamps: true,
})

export const Product = mongoose.model<IProduct>('Product', productSchema);
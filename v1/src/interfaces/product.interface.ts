import { Document, Types } from "mongoose";

interface Image {
  name: string;
  fileUrl: string;
  publicId: string;
  fileType: string;
  fileSize: number;
  format: string;
  uploadedAt: Date;
}

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: Image[];
  // ratings: {
  //   user: mongoose.Schema.Types.ObjectId;
  //   rating: number;
  //   comment?: string;
  // }[];
  // averageRating: number;
  // numOfReviews: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
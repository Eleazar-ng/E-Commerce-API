import { InternalServerError, RequestValidationError } from "../../../errors";
import { Product } from "../../../models/Product";
import { CreateProductRequest } from "../../../requests/interface";
import { UploadService } from "./upload.service";

export class ProductService {
  static create = async (data:CreateProductRequest, files:any) => {
    let uploadedImages = [] as any;
    const images = files;

    try {
      if(!images || images.length === 0){
        throw new RequestValidationError("At least 1 product image is required");
      }
      uploadedImages = await UploadService.uploadFiles(images);
    } catch (error) {
      console.error("Product-images upload error", error);
      throw new InternalServerError('Failed to upload product images');
    }

    const {name, description, price, stock, isFeatured, category} = data
    try {
      const product = await Product.create({
        name, description, category, isFeatured,
        price: Number(price), stock: Number(stock),
        images: uploadedImages
      })
      return product;
    } catch (error) {
      console.error("Product creation error", error)
      if(uploadedImages && uploadedImages.length > 0){
        await UploadService.deleteFiles(uploadedImages)
      }
      throw error
    }
  }
}
import { InternalServerError, NotFoundError, RequestValidationError } from "../../../errors";
import { Product } from "../../../models/Product";
import { CreateProductRequest, ProductImageRequest, ProductRequest, ProductsRequest } from "../../../requests/interface";
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

  static getAll = async (data:ProductsRequest) => {
    try {
      const {page = 1, limit = 10, search, sort = "-createdAt"} = data;

      const query: any = {};

      if(search){
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      // Execute query
      const skip = (Number(page) - 1) * Number(limit);

      const [products, total] = await Promise.all([
        Product.find(query)
        .sort(sort).skip(skip).limit(Number(limit)).lean(),
        Product.countDocuments(query),
      ]);

      return {
        products,
        pagination: {
          page, limit, total,
          pages: Math.ceil(total/ Number(limit))
        }
      }

    } catch (error) {
      throw error
    }
  }

  static getOne = async (data:ProductRequest) => {
    try {
      const { id } = data;

      const product = await Product.findById(id);
      if (!product) {
        throw new NotFoundError("Product not found");
      }
      
      return product;
    } catch (error) {
      throw error
    }
  }

  static update = async (params:ProductRequest, data:CreateProductRequest, files:any) => {
    let uploadedImages = [] as any;
    const images = files;
    const {name, description, price, stock, isFeatured, category} = data;

    try {
      const { id } = params;

      const product = await Product.findById(id);
      if (!product) {
        throw new NotFoundError("Product not found");
      }

      if(product.images.length < 5){
        const validUploadCount = 5 - product.images.length;
        if(images){
          if(images.length > validUploadCount){
            throw new RequestValidationError(`Exceeded product images limit. You only have ${validUploadCount} upload(s) left. To increase uploads count, kindly delete older images`)
          }
          images.splice(validUploadCount,);
        }
      }

      // Handle new image uploads if necessary
      try {
        if(product.images.length < 5 && images.length > 0){
          uploadedImages = await UploadService.uploadFiles(images);
        }
      } catch (error) {
        console.error("Product-images upload error", error);
        throw new InternalServerError('Failed to upload product images');
      }

      // Update product
      try {
        const updateProduct = await Product.findByIdAndUpdate(
          product.id, 
          {
            name, description, category, isFeatured,
            price: Number(price), stock: Number(stock),
            images: [...product.images, ...uploadedImages]
          },
          {new: true, runValidators: true}
      )
        return updateProduct;
      } catch (error) {
        console.error("Product update error", error)
        if(uploadedImages && uploadedImages.length > 0){
          await UploadService.deleteFiles(uploadedImages)
        }
        throw error
      }

    } catch (error) {
      throw error
    }
  }

  static deleteImages = async (params:ProductRequest, data:ProductImageRequest,) => {
    try {
      const { id } = params;
      const { ids } = data;

      const product = await Product.findById(id);
      if (!product) {
        throw new NotFoundError("Product not found");
      }

      if(ids.length === 0){
        throw new RequestValidationError("Product images cannot be empty. Add at least 1 product image to be deleted")
      }

      let images = [];
      let publicIds = [];

      for(const id of ids){
        for(const image of product.images){
          if(image._id.toString() === id){
            images.push(image)
            publicIds.push(image._id)
          }
        }
      }

      if(images && images.length > 0){
        await UploadService.deleteFiles(images)
      }else{
        throw new NotFoundError("Could not find the images associated with this product");
      }

      const productImages = product.images.filter((image) => {
        return !publicIds.includes(image._id);
      })

      await Product.findByIdAndUpdate(
        product.id,
        {
          images: [...productImages]
        },
        {new: true, runValidators: true}
      )

      return true;
    } catch (error) {
      throw error
    }
  }

  static delete = async (params:ProductRequest) => {
    try {
      const { id } = params;

      const product = await Product.findById(id);
      if (!product) {
        throw new NotFoundError("Product not found");
      }

      if(product.images.length > 0){
        await UploadService.deleteFiles(product.images);
      }

      const deleteProduct = await Product.findByIdAndDelete(product.id);

      return deleteProduct;
    } catch (error) {
      throw error
    }
  }
}
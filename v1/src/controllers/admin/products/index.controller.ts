import { Request, Response } from "express";
import { AsyncHandler } from "../../../requests/middleware";
import { CreateProductRequest, ProductRequest, ProductsRequest } from "../../../requests/interface";
import { ProductService } from "../../../services";
import { success } from "../../../utils/helpers";

export class AdminProductController {
  static create = AsyncHandler(
    async (request:Request<{},{},CreateProductRequest>, response:Response) => {
      const payload = request.body;
      const files = request.files;
      const data = await ProductService.create(payload, files);
      return success(response,`Product created successfully`,data,201);
    }
  )

  static getAll = AsyncHandler(
    async (request:Request<{},{},{},ProductsRequest>, response:Response) => {
      const query = request.query;
      const data = await ProductService.getAll(query);
      return success(response,`Products retrieved successfully`,data,200);
    }
  )

  static getOne = AsyncHandler(
    async (request:Request<ProductRequest,{},{},{}>, response:Response) => {
      const params = request.params;
      const data = await ProductService.getOne(params);
      return success(response,`Product retrieved successfully`,data,200);
    }
  )

  static update = AsyncHandler(
    async (request:Request<ProductRequest,{},CreateProductRequest>, response:Response) => {
      const params = request.params;
      const payload = request.body;
      const files = request.files;
      const data = await ProductService.update(params, payload, files);
      return success(response,`Product updated successfully`,data,201);
    }
  )
}
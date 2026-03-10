import { Request, Response } from "express";
import { AsyncHandler } from "../../../requests/middleware";
import { CreateProductRequest, ProductRequest } from "../../../requests/interface";
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
    async (request:Request<{},{},{},ProductRequest>, response:Response) => {
      const query = request.query;
      const data = await ProductService.getAll(query);
      return success(response,`Products retrieved successfully`,data,200);
    }
  )
}
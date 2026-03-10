import { Request, Response } from "express";
import { AsyncHandler } from "../../../requests/middleware";
import { CreateProductRequest } from "../../../requests/interface";
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
}
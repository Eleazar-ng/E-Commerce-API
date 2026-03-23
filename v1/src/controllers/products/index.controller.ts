import { Request, Response } from "express";
import { AsyncHandler } from "../../requests/middleware";
import { ProductRequest, ProductsRequest } from "../../requests/interface";
import { ProductService } from "../../services";
import { success } from "../../utils/helpers";

export class ProductController {
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
}
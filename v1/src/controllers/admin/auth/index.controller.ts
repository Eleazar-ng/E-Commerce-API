import { Request, Response } from "express";
import { AsyncHandler } from "../../../requests/middleware";
import { SignInRequest } from "../../../requests/interface";
import { AdminAuthService } from "../../../services";
import { success } from "../../../utils/helpers";

export class AdminAuthController {
  static signin = AsyncHandler(
    async (request:Request<{},{},SignInRequest>, response:Response) => {
      const payload = request.body;
      const data = await AdminAuthService.signin(payload);
      return success(response,`Logged-In successfully`,data,201);
    }
  )
}
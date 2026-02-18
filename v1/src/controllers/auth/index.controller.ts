import { Request, Response } from "express";
import { AsyncHandler } from "../../requests/middleware";
import { SignUpRequest } from "../../requests/interface";
import { AuthService } from "../../services";
import { success } from "../../utils/helpers/response.api";

export class AuthController {
  static signup = AsyncHandler(
    async (request:Request<{},{},SignUpRequest>, response:Response) => {
      const payload = request.body;
      const data = await AuthService.signup(payload);
      return success(response,"Account created successfully. Kindly check your email for verification code",data,201);
    }
  )
}
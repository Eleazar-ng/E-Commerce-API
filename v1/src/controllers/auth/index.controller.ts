import { Request, Response } from "express";
import { AsyncHandler } from "../../requests/middleware";
import { ResendCodeRequest, SignInRequest, SignUpRequest, VerifyEmailRequest } from "../../requests/interface";
import { AuthService } from "../../services";
import { success } from "../../utils/helpers";

export class AuthController {
  static signup = AsyncHandler(
    async (request:Request<{},{},SignUpRequest>, response:Response) => {
      const payload = request.body;
      const data = await AuthService.signup(payload);
      return success(response,"Account created successfully. Kindly check your email for verification code",data,201);
    }
  )

  static resendCode = AsyncHandler(
    async (request:Request<{},{},ResendCodeRequest>, response:Response) => {
      const payload = request.body;
      const data = await AuthService.resendCode(payload);
      return success(response,`Verification code sent to ${payload.email} successfullty.`,data,201);
    }
  )

  static verifyEmail = AsyncHandler(
    async (request:Request<{},{},VerifyEmailRequest>, response:Response) => {
      const payload = request.body;
      const data = await AuthService.verifyEmail(payload);
      return success(response,`Email verified successfullty.`,data,201);
    }
  )

  static signin = AsyncHandler(
    async (request:Request<{},{},SignInRequest>, response:Response) => {
      const payload = request.body;
      const data = await AuthService.signin(payload);
      return success(response,`Logged-In successfully`,data,201);
    }
  )
}
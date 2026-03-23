import { Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { AsyncHandler } from "./async.handler";
import { error } from "../../utils/helpers";
import { env } from "../../config/env";
import { JwtPayload } from "../interface";
import { Account } from "../../models";

export const authenticateToken = AsyncHandler(
  async ( req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string | undefined;

      if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        return error(res, "Authentication token is required", 400);
      }

      const decoded = jwt.verify(token, env.JWT_SECRET!) as JwtPayload;
      
      const user = await Account.findById(decoded.id).select("-password");
      
      if (!user) {
        return error(res, "User not found", 404);
      }

      req.user = user;
      next();
    } catch (err: any) {
      console.error("Error while processing auth token", err)
      switch (err.name) {
        case "TokenExpiredError":
          return error(res, "Session has expred. Kindly login  to continue", 401)
          break;

        case "JsonWebTokenError":
          return error(res, "Session token is invalid/malformed", 422)
          break;

        default:
          return error(res, "Encountered error while processing request with authentication token", 400)	
      }
      // return error(res, "Encountered error while processing request with authentication token", 400)
    }
  }
);

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return error(res, "User not found", 404);
    }

    if (!roles.includes(req.user.accountType)) {
      return error(res, `You are not authorized to access this route`, 403)
    }

    next();
  };
};
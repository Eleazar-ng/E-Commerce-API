import jwt from "jsonwebtoken"
import { AccountType } from "../../interfaces"
import { env } from "../../config/env";

export class TokenService {
  static signToken = async (id: string, accountType: AccountType): Promise<string> => {
    return jwt.sign({id, accountType}, env.JWT_SECRET, {
      expiresIn: <any>env.JWT_EXPIRES_IN});
  }
}
import { NotFoundError, RequestValidationError } from "../../../errors";
import { Admin } from "../../../models";
import { SignInRequest } from "../../../requests/interface";
import { TokenService } from "../../auth/token.service";

export class AdminAuthService {
  static signin = async (data:SignInRequest) => {
    try {
      const { email, password } = data;

      const admin = await Admin.findOne({email});
      if(!admin){
        throw new NotFoundError('Account not found');
      }

      const isValidPassword = await admin.comparePassword(password);
      if(!isValidPassword){
        throw new RequestValidationError("Invalid password/Password mismatch");
      }

      admin.lastLogin = new Date();
      await admin.save();

      const token = await TokenService.signToken(admin._id.toString(), admin.accountType);

      admin.password = undefined as any;

      return {admin,token, requiresVerification: !admin.isEmailVerified}
    } catch (error) {
      throw error
    }
  }
}
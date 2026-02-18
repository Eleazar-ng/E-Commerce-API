import { emailService } from "../../config/event";
import { verificationEmailOption } from "../../emails/mailOptions";
import { ConflictError, ForbiddenError } from "../../errors";
import { AuthCodeType, IAccount, IUser, } from "../../interfaces";
import { Account, User } from "../../models";
import { AuthCode } from "../../models/AuthCode";
import { SignUpRequest } from "../../requests/interface";


export class AuthService {
  private static generateAndSendCode = async (email:string, firstName:string, type:AuthCodeType) => {
    const code = AuthCode.generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await AuthCode.deleteMany({ email, type});

    const authCode = new AuthCode({
      email, code, type, expiresAt
    })

    await authCode.save();

    switch(type){
      case "email_verification":
        const mailOptions = verificationEmailOption(email, firstName, code)
        emailService.sendEmailVerificationEmail(mailOptions, "EMAIL_VERIFICATION")
        break;
      default:  
        throw new ForbiddenError("Invalid email type");
    }

    return code;
  }

  static signup = async (data:SignUpRequest) => {
    try {
      const { email, password, firstName, lastName } = data;

      const existingAccount = await Account.findOne({email});
      if(existingAccount){
        throw new ConflictError("Email already in use");
      }

      const newUser = new User({
        firstName, lastName, email, password
      })

      await newUser.save();

      await this.generateAndSendCode(email, firstName, "email_verification");

      newUser.password = undefined as any;

      return newUser.email;
    } catch (error) {
      throw error
    }
  }
}
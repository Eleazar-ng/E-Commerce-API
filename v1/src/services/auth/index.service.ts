import { emailService } from "../../config/event";
import { verificationEmailOption, welcomeEmailOption } from "../../emails/mailOptions";
import { ConflictError, ForbiddenError, NotFoundError, RequestValidationError } from "../../errors";
import { AuthCodeType, IAccount, IUser, } from "../../interfaces";
import { Account, User } from "../../models";
import { AuthCode } from "../../models/AuthCode";
import { ResendCodeRequest, SignInRequest, SignUpRequest, VerifyEmailRequest } from "../../requests/interface";
import { EMAIL_TYPE } from "../../utils/helpers";
import { TokenService } from "./token.service";


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

  static resendCode = async (data:ResendCodeRequest) => {
    try {
      const { email, type } = data;

      if(!EMAIL_TYPE.includes(type)){
        throw new RequestValidationError("Invalid email type")
      }

      const user = await User.findOne({email});
      if(!user){
        throw new NotFoundError('Account not found');
      }

      if(type == "email_verification"){
        if(user.isEmailVerified){
          throw new ConflictError("Email is already verified")
        }
      }

      await this.generateAndSendCode(user.email, user.firstName, type);

      return user.email;
    } catch (error) {
      throw error
    }
  }

  static verifyEmail = async (data:VerifyEmailRequest) => {
    try {
      const { email, code } = data;

      const user = await User.findOne({email});
      if(!user){
        throw new NotFoundError('Account not found');
      }

      const authCode = await AuthCode.findOne({
        email, type: "email_verification", used: false
      });
      if(!authCode){
        throw new NotFoundError('Verfication code not found')
      }

      if(new Date() > authCode.expiresAt){
        throw new ForbiddenError('Verification code has expired. Kindly request for a new code')
      }

      if(authCode.attempts < 5){
        authCode.attempts += 1;
        authCode.save();
      }
      
      if(authCode.attempts >= 5){
        throw new RequestValidationError("Too many attempts. Kindly request for a new code");
      }

      const isValidCode = await authCode.compareCode(code);
      if(!isValidCode){
        throw new RequestValidationError("Invalid verification code");
      }

      authCode.used = true;
      await authCode.save();

      user.isEmailVerified = true;
      user.isActive = true;
      await user.save();

      //Send email
      const mailOptions = welcomeEmailOption(user.email, user.firstName);
      emailService.sendWelcomeEmail(mailOptions, "WELCOME_EMAIL");

      const token = await TokenService.signToken(user._id.toString(), user.accountType);

      user.password = undefined as any;

      return {user,token}
    } catch (error) {
      throw error
    }
  }

  static signin = async (data:SignInRequest) => {
    try {
      const { email, password } = data;

      const user = await User.findOne({email});
      if(!user){
        throw new NotFoundError('Account not found');
      }

      if(!user.isActive){
        throw new ForbiddenError("Account has been deactiviated. Contact the support team for a resolution");
      }

      const isValidPassword = await user.comparePassword(password);
      if(!isValidPassword){
        throw new RequestValidationError("Invalid password/Password mismatch");
      }

      user.lastLogin = new Date();
      await user.save();

      const token = await TokenService.signToken(user._id.toString(), user.accountType);

      user.password = undefined as any;

      return {user,token, requiresVerification: !user.isEmailVerified}
    } catch (error) {
      throw error
    }
  }
}
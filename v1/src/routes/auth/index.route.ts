import { Router } from "express";
import { validate } from "../../requests/middleware";
import { forgotPasswordSchema, resendCodeSchema, resetPasswordSchema, signinSchema, signupSchema, verifyEmailSchema } from "../../requests/schemas";
import { AuthController } from "../../controllers";

const router = Router();

router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/resend-code", validate(resendCodeSchema), AuthController.resendCode);
router.post("/verify-email", validate(verifyEmailSchema), AuthController.verifyEmail);
router.post("/signIn", validate(signinSchema), AuthController.signin);
router.post("/forgot-password", validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), AuthController.resetPassword);

export { router as Auth }
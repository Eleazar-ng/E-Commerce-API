import { Router } from "express";
import { validate } from "../../requests/middleware";
import { resendCodeSchema, signinSchema, signupSchema, verifyEmailSchema } from "../../requests/schemas";
import { AuthController } from "../../controllers";

const router = Router();

router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/resend-code", validate(resendCodeSchema), AuthController.resendCode);
router.post("/verify-email", validate(verifyEmailSchema), AuthController.verifyEmail);
router.post("/signIn", validate(signinSchema), AuthController.signin);

export { router as Auth }
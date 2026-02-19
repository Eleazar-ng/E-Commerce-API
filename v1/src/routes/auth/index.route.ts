import { Router } from "express";
import { validate } from "../../requests/middleware";
import { resendCodeSchema, signupSchema, verifyEmailSchema } from "../../requests/schemas";
import { AuthController } from "../../controllers";

const router = Router();

router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/resend-code", validate(resendCodeSchema), AuthController.resendCode);
router.post("/verify-email", validate(verifyEmailSchema), AuthController.verifyEmail);

export { router as Auth }
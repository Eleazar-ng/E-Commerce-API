import { Router } from "express";
import { validate } from "../../requests/middleware";
import { signupSchema } from "../../requests/schemas";
import { AuthController } from "../../controllers";

const router = Router();

router.post("/signup", validate(signupSchema), AuthController.signup);

export { router as Auth }
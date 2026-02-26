import { Router } from "express";
import { validate } from "../../../requests/middleware";
import { signinSchema } from "../../../requests/schemas";
import { AdminAuthController } from "../../../controllers";

const router = Router();

router.post("/signIn", validate(signinSchema), AdminAuthController.signin);

export { router as AdminAuth }
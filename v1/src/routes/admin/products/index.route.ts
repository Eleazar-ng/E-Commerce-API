import { Router } from "express";
import { validate } from "../../../requests/middleware";
import { createProductSchema } from "../../../requests/schemas";
import { handleMulterError, uploadMultiple, validateImageCount } from "../../../utils/helpers";
import { AdminProductController } from "../../../controllers";

const router = Router();

router.post("/", 
  uploadMultiple.array('images', 5),
  handleMulterError,
  validateImageCount,
  validate(createProductSchema), 
  AdminProductController.create
);

export { router as AdminProducts }
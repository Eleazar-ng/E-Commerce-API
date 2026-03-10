import { Router } from "express";
import { validate, validateQuery } from "../../../requests/middleware";
import { createProductSchema, productSchema } from "../../../requests/schemas";
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

router.get("/",
  validateQuery(productSchema),
  AdminProductController.getAll
)

export { router as AdminProducts }
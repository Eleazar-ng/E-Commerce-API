import { Router } from "express";
import { validate, validateParams, validateQuery } from "../../../requests/middleware";
import { createProductSchema, productsSchema, productSchema, productImagesSchema } from "../../../requests/schemas";
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
  validateQuery(productsSchema),
  AdminProductController.getAll
)

router.get("/:id",
  validateParams(productSchema),
  AdminProductController.getOne
)

router.put("/:id",
  uploadMultiple.array('images', 5),
  handleMulterError,
  validateParams(productSchema),
  validate(createProductSchema),
  AdminProductController.update
)

router.patch("/:id/images/remove",
  validateParams(productSchema),
  validate(productImagesSchema),
  AdminProductController.deleteImage
)

router.delete("/:id",
  validateParams(productSchema),
  AdminProductController.delete
)



export { router as AdminProducts }
import { Router } from "express";
import { validateParams, validateQuery } from "../../requests/middleware";
import { productSchema, productsSchema } from "../../requests/schemas";
import { ProductController } from "../../controllers";

const router = Router();

router.get("/",
  validateQuery(productsSchema),
  ProductController.getAll
)

router.get("/:id",
  validateParams(productSchema),
  ProductController.getOne
)

export { router as Products }
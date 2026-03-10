import express from "express";
import { env } from "../config/env";
import { Home } from "./home.route";
import { Auth } from "./auth/index.route";
import { AdminAuth, AdminProducts } from "./admin";
import { authenticateToken, authorize } from "../requests/middleware";

const URL = env.APP_URL

const router = express.Router();

//Home
router.use(`${URL}`, Home);

//Auth
router.use(`${URL}/auth`, Auth);

//Admin
router.use(`${URL}/admin/auth`, AdminAuth);
router.use(`${URL}/admin/products`, 
  authenticateToken,
  authorize("Admin"), 
  AdminProducts
)

export {router as Routers}
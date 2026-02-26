import express from "express";
import { env } from "../config/env";
import { Home } from "./home.route";
import { Auth } from "./auth/index.route";
import { AdminAuth } from "./admin/auth/index.route";

const URL = env.APP_URL

const router = express.Router();

//Home
router.use(`${URL}`, Home);

//Auth
router.use(`${URL}/auth`, Auth);


//Admin
router.use(`${URL}/admin/auth`, AdminAuth);

export {router as Routers}
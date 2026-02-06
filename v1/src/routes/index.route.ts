import express from "express";
import { env } from "../config/env";
import { Home } from "./home.route";

const URL = env.APP_URL

const router = express.Router();

//Home
router.use(`${URL}`, Home);

export {router as Routers}
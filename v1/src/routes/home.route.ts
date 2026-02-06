import express from "express";

const route = express.Router();

route.get("/", (req,res) => {
  res.status(200).json({
    message:"E-Commerce API version 1 !********"
    });
});

export { route as Home };
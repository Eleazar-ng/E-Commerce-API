import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { RequestValidationError } from "../../errors";
import { error } from "../../utils/helpers/response.api";

export const validate = (schema: z.ZodSchema) => (request: Request, response: Response, next: NextFunction) => {
  try {
    schema.parse(request.body);
    next()
  } catch (err) {
    if(err instanceof z.ZodError){
      const parsed = JSON.parse(err.message);
      console.log(parsed)
      throw new RequestValidationError(parsed[0].message);
    }
    next(error);
  }
}
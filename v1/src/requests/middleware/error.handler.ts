/** @format */

import { Request, Response, NextFunction } from "express";
import { error } from "../../utils/helpers/response.api";
import { CustomError } from "../../errors/custom.error";
/**
 * @desc error handler middleware
 * @param {Request} req http request
 * @param {Response} res http response
 * @param {NextFunction} next executes the next middleware when invoked
 * @returns error object
 */
export const ErrorHandler = (err: any, req: Request, res: Response, next:NextFunction) => {
  console.log(err)
  if (err instanceof CustomError) {
    return error(res, err.serializeErrors()[0].message, err.statusCode);
  }

  return error(
    res,
    "We have experienced a technical glitch whilst processing your request, kindly try again in a few seconds.",
    500,
  );
};
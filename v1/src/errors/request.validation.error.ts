/** @format */

import { CustomError } from "./custom.error";

export class RequestValidationError extends CustomError {
  constructor(message: any) {
    super(message);
    // this.message = message;
    this.statusCode = 422;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}

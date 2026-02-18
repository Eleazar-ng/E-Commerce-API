/** @format */

import { CustomError } from "./custom.error";

export class ConflictError extends CustomError {
  constructor(message: any) {
    super(message);
    // this.message = message;
    this.statusCode = 409;
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}

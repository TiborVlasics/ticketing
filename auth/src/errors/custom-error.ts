// Using abstract class, to be able to use instanceof operator
// interfaces are not exist at runtime, so we cannot use instanceof operator with interfaces
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // Message is for logging purposes
    super(message);
    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}

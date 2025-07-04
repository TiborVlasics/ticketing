import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  readonly reason = 'Error connecting to database';
  readonly code = 'DB_CONN_ERR';
  readonly statusCode = 500;

  constructor() {
    super('Error connecting to database');

    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

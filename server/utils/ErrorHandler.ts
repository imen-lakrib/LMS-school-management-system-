//oop class for handling errors

//extends its like giving a name
//constructor are arguments
class ErrorHandler extends Error {
  statusCode: Number;
  constructor(message: any, statusCode: Number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

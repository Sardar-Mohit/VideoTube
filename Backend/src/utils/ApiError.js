class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.data = null;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Method to send error response to the frontend
  sendErrorResponse(res) {
    res.status(this.statusCode).json({
      success: false,
      message: this.message,
      errors: this.errors,
    });
  }
}

export { ApiError };

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.isOperational = true;
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(400, message);
  }
}

class InternalServerError extends ApiError {
  constructor(message = "Internal Server Error") {
    super(500, message);
  }
}

module.exports = {
  ApiError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
};

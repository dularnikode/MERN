class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default ErrorHandler;

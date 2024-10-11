import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof MongoError) {
    return res.status(500).json({
      message: "Database error occurred",
      error: err.message,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors,
    });
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

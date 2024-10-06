import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
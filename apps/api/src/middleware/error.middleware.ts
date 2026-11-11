import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.config.js';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(`Error processing ${req.method} ${req.originalUrl}: ${err.message}`, {
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: `ERROR_${err.statusCode}`,
        message: err.message,
        details: err.details,
      },
    });
    return;
  }

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_ID',
        message: 'Invalid resource identifier provided',
      },
    });
    return;
  }

  // Handle Mongoose duplicate key error (11000)
  if ((err as any).code === 11000) {
    const keys = Object.keys((err as any).keyValue || {});
    res.status(409).json({
      success: false,
      error: {
        code: 'DUPLICATE_ENTRY',
        message: `A resource with that ${keys.join(', ')} already exists`,
      },
    });
    return;
  }

  // Fallback for unhandled internal server errors
  const isDev = env.NODE_ENV === 'development';
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isDev ? err.message : 'An unexpected error occurred',
      ...(isDev ? { stack: err.stack } : {}),
    },
  });
};

import { Response } from 'express';

export interface ApiResponseOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data: T;
}

export const sendSuccess = <T>({
  res,
  statusCode = 200,
  message,
  data,
}: ApiResponseOptions<T>): Response => {
  return res.status(statusCode).json({
    success: true,
    ...(message ? { message } : {}),
    data,
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  details?: any,
  code: string = 'ERROR'
): Response => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  });
};

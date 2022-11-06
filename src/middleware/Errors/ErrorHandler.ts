import { NextFunction, Response, Request } from 'express';
import { NODE_ENV } from '../../utils/config';
import AuthenticationError from './AuthenticationError';
import BadRequestError from './BadRequestError';
import CustomError from './CustomError';
import NotFoundError from './NotFoundError';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ErrorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status =
    err.status !== null && err.status !== undefined ? err.status : 500;
  const message = err.message.length > 0 ? err.message : 'Something went wrong';
  const error = err.error !== null ? err.error : null;

  if (
    err instanceof BadRequestError ||
    err instanceof AuthenticationError ||
    err instanceof NotFoundError
  ) {
    return err;
  }

  const errorResponse = {
    status,
    message,
    error,
    stack: NODE_ENV === 'production' ? '🥞' : err.stack,
  };

  res.status(status).json(errorResponse);
}

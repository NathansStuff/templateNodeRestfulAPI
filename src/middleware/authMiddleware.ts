import { NextFunction, Response, Request } from 'express';
import AuthenticationError from './Errors/AuthenticationError';

import { verifyToken } from '../services/tokenService';
import { getUserById } from '../services/userService';
import { UserReturnType, UserType } from '../types/userTypes';

export interface GetUserAuthInfoRequest extends Request {
  user?: UserType;
}

export interface AuthorizedUserRequest extends Request {
  user?: UserReturnType;
}

export async function protect(
  req: GetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  // expect {headers: {authorization: "Bearer token"}}
  if (
    req.headers.authorization === null ||
    req.headers.authorization === '' ||
    req.headers.authorization === undefined ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    throw new AuthenticationError('Not authorized to access this route');
  }

  const token = req.headers.authorization.split(' ')[1];
  const decoded = verifyToken(token);
  req.user = await getUserById(decoded._id);
  next();
}

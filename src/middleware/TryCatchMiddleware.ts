/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export function TryCatchMiddleware(middlewareFn: any): any {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('TryCatchMiddleware middlewareFn', middlewareFn);
    Promise.resolve(middlewareFn(req, res, next)).catch(next);
  };
}

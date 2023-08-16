import { NextFunction, Request, Response } from 'express';

import CustomError from '@/exceptions/CustomError';

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function TryCatchMiddleware(middlewareFn: MiddlewareFunction): MiddlewareFunction {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await middlewareFn(req, res, next);
        } catch (error) {
            if (error instanceof CustomError) {
                console.log('trye');
                res.status(error.statusCode).json({ status: error.status, error: error.message });
            } else if (error instanceof Error) {
                res.status(500).json({ message: `Internal error. Error: ${error.message}` });
            } else {
                res.status(500).json({ message: `Internal error. Error: ${error}` });
            }
        }
    };
}

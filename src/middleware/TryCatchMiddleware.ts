import { NextFunction, Request, Response } from 'express';

export const TryCatchMiddleware =
    // @ts-expect-error It's a function that returns a function it has to be typed as any
    (fn) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

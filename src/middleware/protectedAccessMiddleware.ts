import { NextFunction, Request, Response } from 'express';

import { EActionAccess } from '@/types/EActionAccess';

import { protect } from './authMiddleware';
import { TryCatchMiddleware } from './TryCatchMiddleware';

// Create a reusable middleware function for protected routes
export function protectedAccessMiddleware(
    action: EActionAccess,
    handler: (req: Request, res: Response) => Promise<void>
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    async function wrapper(req: Request, res: Response): Promise<void> {
        await protect(req, res, action);
        await handler(req, res);
    }

    return TryCatchMiddleware(wrapper);
}

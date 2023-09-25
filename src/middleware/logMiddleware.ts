import { NextFunction, Request, Response } from 'express';

import { createNewLog } from '@/features/log/logService';
import { Log } from '@/features/log/logType';

export function logMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Log the request details
    res.locals.auditTimer = Date.now(); // Start the audit timer
    res.locals.ipAddress = req.ip; // Capture the IP address

    // Capture the original response.send function
    const originalSend = res.send;

    // Override the response.send function to log the response data
    res.send = function (body: unknown): any {
        // Log the audit timer
        const auditTimer = Date.now() - res.locals.auditTimer;

        // Log the response details
        const log: Log = {
            authorisation: res.locals.apiKey,
            requestBody: JSON.stringify(req.body),
            responseBody: JSON.stringify(body),
            responseStatus: res.statusCode,
            auditTimer,
            endpoint: req.url,
            ipAddress: res.locals.ipAddress,
            partnerId: res.locals.partnerId,
        };

        void createNewLog(log); // Create a new log entry

        // Call the original response.send function and return the result
        return originalSend.call(res, body);
    };

    next();
}

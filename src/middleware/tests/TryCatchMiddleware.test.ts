/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

import CustomError from '@/exceptions/CustomError';

import { TryCatchMiddleware } from '../TryCatchMiddleware';

describe('TryCatchMiddleware', () => {
    it('should handle CustomError and send a response with the correct status code and message', async () => {
        const customError = new CustomError(400, 'Custom Error Message');
        const middlewareFn: jest.Mock = jest
            .fn()
            .mockRejectedValue(customError);
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next: NextFunction = jest.fn();

        await TryCatchMiddleware(middlewareFn as any)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(customError.statusCode);
        expect(res.json).toHaveBeenCalledWith({
            status: customError.status,
            error: customError.message,
        });
    });

    it('should handle standard Error and send a 500 response with the correct message', async () => {
        const standardError = new Error('Standard Error Message');
        const middlewareFn: jest.Mock = jest
            .fn()
            .mockRejectedValue(standardError);
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next: NextFunction = jest.fn();

        await TryCatchMiddleware(middlewareFn as any)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: `Internal error. Error: ${standardError.message}`,
        });
    });

    it('should handle other types of errors and send a 500 response with the correct message', async () => {
        const otherError = 'Unknown Error';
        const middlewareFn: jest.Mock = jest.fn().mockRejectedValue(otherError);
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next: NextFunction = jest.fn();

        await TryCatchMiddleware(middlewareFn as any)(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: `Internal error. Error: ${otherError}`,
        });
    });
});

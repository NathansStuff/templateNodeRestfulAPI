import { BadRequestError } from '../BadRequestError';

describe('BadRequestError', () => {
    it('should set the status code to 400', () => {
        const error = new BadRequestError();
        expect(error.statusCode).toBe(400);
    });

    it('should set the default message to "Bad Request"', () => {
        const error = new BadRequestError();
        expect(error.message).toBe('Bad Request');
    });

    it('should append additional error message if provided', () => {
        const error = new BadRequestError('Access Denied', 'Additional error details');
        expect(error.message).toBe('Access Denied: Additional error details');
    });
});

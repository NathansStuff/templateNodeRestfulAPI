import { NotFoundError } from '../NotFoundError';

describe('NotFoundError', () => {
    it('should set the status code to 400', () => {
        const error = new NotFoundError();
        expect(error.statusCode).toBe(400);
    });

    it('should set the default message to "Not Found"', () => {
        const error = new NotFoundError();
        expect(error.message).toBe('Not Found');
    });

    it('should append additional error message if provided', () => {
        const error = new NotFoundError('Access Denied', 'Additional error details');
        expect(error.message).toBe('Access Denied: Additional error details');
    });
});

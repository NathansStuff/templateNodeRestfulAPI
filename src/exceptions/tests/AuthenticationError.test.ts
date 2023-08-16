import { AuthenticationError } from '../AuthenticationError';

describe('AuthenticationError', () => {
    it('should set the status code to 400', () => {
        const error = new AuthenticationError();
        expect(error.statusCode).toBe(400);
    });

    it('should set the default message to "Unauthorized"', () => {
        const error = new AuthenticationError();
        expect(error.message).toBe('Unauthorized');
    });

    it('should append additional error message if provided', () => {
        const error = new AuthenticationError('Access Denied', 'Additional error details');
        expect(error.message).toBe('Access Denied: Additional error details');
    });
});

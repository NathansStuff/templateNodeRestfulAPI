import CustomError from '../CustomError';

describe('CustomError', () => {
    it('should initialize with a given status code', () => {
        const statusCode = 404;
        const message = 'Not Found';
        const error = new CustomError(statusCode, message);

        expect(error.statusCode).toBe(statusCode);
        expect(error.message).toBe(message);
        expect(error.status).toBe('failure');
    });
});

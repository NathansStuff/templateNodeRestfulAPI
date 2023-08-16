import CustomError from './CustomError';

export class NotFoundError extends CustomError {
    constructor(message = 'Not Found', error?: string | null) {
        super(400, `${message}${error ? `: ${error}` : ''}`);
    }
}

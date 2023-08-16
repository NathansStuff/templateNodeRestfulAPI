import CustomError from './CustomError';

export class AuthenticationError extends CustomError {
    constructor(message = 'Unauthorized', error?: string | null) {
        super(400, `${message}${error ? `: ${error}` : ''}`);
    }
}

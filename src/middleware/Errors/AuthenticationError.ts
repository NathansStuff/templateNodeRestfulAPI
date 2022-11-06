import CustomError from './CustomError';

export default class AuthenticationError extends CustomError {
  constructor(message = 'Unauthorized', error?: string | null) {
    super(message, 400, error);
  }
}

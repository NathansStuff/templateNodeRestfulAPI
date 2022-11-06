import CustomError from './CustomError';

export default class BadRequestError extends CustomError {
  constructor(message = 'Bad Request', error?: string | null) {
    super(message, 400, error);
  }
}

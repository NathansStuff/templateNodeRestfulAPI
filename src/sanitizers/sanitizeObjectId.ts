import mongoose from 'mongoose';
import BadRequestError from '../middleware/Errors/BadRequestError';

export function sanitizeObjectId(id: string): string {
  if (typeof id !== 'string') {
    throw new BadRequestError('Course is not a string');
  }

  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    throw new BadRequestError('Course is not a valid ObjectId');
  }

  return id;
}

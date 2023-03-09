import mongoose from 'mongoose';
import BadRequestError from '../middleware/Errors/BadRequestError';
import { MONGO_URI } from '../utils/config';

export const connectDB = async (): Promise<void> => {
  if (MONGO_URI === '' || MONGO_URI === null) {
    console.log('MONGO_URL is not defined in the env file');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export function checkIsValidObjectId(id: string): void {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`${id} is not a valid id`);
  }
}

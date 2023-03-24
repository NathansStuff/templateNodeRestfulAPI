import { Schema } from 'mongoose';
import { IProgressHistory } from '../types/Learning/IProgressHistory';

const ProgressHistorySchema = new Schema<IProgressHistory>(
  {
    progress: {
      type: String,
      ref: 'Progress',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default ProgressHistorySchema;

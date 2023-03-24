import { Schema } from 'mongoose';
import { IProgress } from '../types/Learning/IProgress';

const ProgressSchema = new Schema<IProgress>(
  {
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    topic: {
      type: String,
      ref: 'Topic',
      required: true,
    },
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default ProgressSchema;

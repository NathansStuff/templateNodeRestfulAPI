import { Schema } from 'mongoose';
import { ICourse } from '../types/Learning/ICourse';

const CourseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    topics: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        default: [],
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default CourseSchema;

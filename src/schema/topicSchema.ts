import { Schema } from 'mongoose';
import { ITopic } from '../types/ITopic';

const TopicSchema = new Schema<ITopic>(
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
    weight: {
      type: Number,
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default TopicSchema;

import mongoose, { Schema, Document } from 'mongoose';
import { IContent } from '../types/IContent';

// Create a schema for the content
const ContentSchema = new Schema<IContent>(
  {
    topic: {
      type: String,
      ref: 'Topic',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      enum: ['text', 'video', 'image'], // Add more content types as needed
    },
  },
  { timestamps: true }
);

export default ContentSchema;

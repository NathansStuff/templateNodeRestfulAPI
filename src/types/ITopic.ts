import { Schema } from 'mongoose';

export interface ITopic {
  _id: string; // MongoDB ObjectId
  name: string;
  description: string;
  weight: number; // Importance or weightage of the topic in the exam
  course: Schema.Types.ObjectId; // Reference to Course _id
  createdAt: Date;
  updatedAt: Date;
}

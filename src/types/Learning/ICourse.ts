import { Schema } from 'mongoose';

export interface ICourse {
  _id: string; // MongoDB ObjectId
  name: string;
  description: string;
  topics: Schema.Types.ObjectId[]; // Array of references to Topic _ids
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourse {
  _id: string; // MongoDB ObjectId
  name: string;
  description: string;
  topics: string[]; // Array of references to Topic _ids
  createdAt: Date;
  updatedAt: Date;
}

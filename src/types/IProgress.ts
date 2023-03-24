export interface IProgress {
  _id: string; // MongoDB ObjectId
  user: string; // Reference to User _id
  topic: string; // Reference to Topic _id
  score: number; // A score representing user's understanding of the topic (0-100)
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

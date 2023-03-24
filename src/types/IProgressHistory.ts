export interface IProgressHistory {
  _id: string; // MongoDB ObjectId
  progress: string; // Reference to Progress _id
  score: number; // The score at a given point in time
  timestamp: Date; // When the progress was recorded
}

export interface IUser {
  _id: string; // MongoDB ObjectId
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Hashed password
  createdAt: Date;
  updatedAt: Date;
}

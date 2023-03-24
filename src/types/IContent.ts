export interface IContent {
  _id: string; // MongoDB ObjectId
  topic: string; // Reference to Topic _id
  title: string; // Title of the content
  body: string; // The actual content
  contentType: string; // Type of content, e.g., 'text', 'video', 'image'
  createdAt: Date;
  updatedAt: Date;
}

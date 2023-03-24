import TopicModel from '../models/topicModel';
import { ITopic } from '../types/ITopic';

// Find all topics
export async function findTopics(): Promise<ITopic[]> {
  return await TopicModel.find();
}

// Find a topic by ID
export async function findTopicById(id: string): Promise<ITopic | null> {
  return await TopicModel.findById(id);
}

// Create a new topic
export async function createTopic(topicData: ITopic): Promise<ITopic> {
  const topic = new TopicModel(topicData);
  return await topic.save();
}

// Update a topic by ID
export async function updateTopicById(
  id: string,
  topicData: ITopic
): Promise<ITopic | null> {
  return await TopicModel.findByIdAndUpdate(id, topicData, { new: true });
}

// Delete a topic by ID
export async function deleteTopicById(id: string): Promise<ITopic | null> {
  return await TopicModel.findByIdAndDelete(id);
}

export async function deleteTopicsByCourse(courseId: string): Promise<void> {
  await TopicModel.deleteMany({ course: courseId });
}

// Find all topics by course ID
export async function findTopicsByCourseId(
  courseId: string
): Promise<ITopic[] | null> {
  return await TopicModel.find({ course: courseId });
}

import {
  createTopic,
  findTopics,
  findTopicById,
  updateTopicById,
  deleteTopicById,
  deleteTopicsByCourse,
  findTopicsByCourseId,
} from '../dals/topicDals';
import { sanitizeTopic } from '../sanitizers/topicSanitizer';
import { ITopic } from '../types/ITopic';

// Create a new topic
export async function createNewTopic(topicData: ITopic): Promise<ITopic> {
  const sanitizedTopicData = sanitizeTopic(topicData, true);
  const topic = await createTopic(sanitizedTopicData);
  return topic;
}

// Get all topics
export async function getTopics(): Promise<ITopic[]> {
  const topics = await findTopics();
  return topics;
}

// Get a topic by ID
export async function getTopicById(topicId: string): Promise<ITopic | null> {
  const topic = await findTopicById(topicId);
  return topic;
}

// Update a topic by ID
export async function updateTopic(
  topicId: string,
  topicData: Partial<ITopic>
): Promise<ITopic | null> {
  const sanitizedTopicData = sanitizeTopic(topicData, false);
  const updatedTopic = await updateTopicById(topicId, sanitizedTopicData);
  return updatedTopic;
}

// Delete a topic by ID
export async function deleteTopic(topicId: string): Promise<ITopic | null> {
  const deletedTopic = await deleteTopicById(topicId);
  return deletedTopic;
}

// Delete all topics associated with a course
export async function deleteTopicsByCourseId(courseId: string): Promise<void> {
  await deleteTopicsByCourse(courseId);
}

// Get all topics associated with a course
export async function getTopicsByCourseId(
  courseId: string
): Promise<ITopic[] | null> {
  const topics = await findTopicsByCourseId(courseId);
  return topics;
}

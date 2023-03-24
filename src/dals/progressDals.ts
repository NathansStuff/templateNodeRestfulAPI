import ProgressModel from '../models/progressModel';
import TopicModel from '../models/topicModel';
import { IProgress } from '../types/Learning/IProgress';
import { findTopicsByCourseId } from './topicDals';

// Create a new progress entry
export async function createProgress(
  progressData: Partial<IProgress>
): Promise<IProgress> {
  const progress = new ProgressModel(progressData);
  return await progress.save();
}

// Find all progress entries
export async function findProgress(): Promise<IProgress[]> {
  return await ProgressModel.find();
}

// Find a progress entry by ID
export async function findProgressById(
  progressId: string
): Promise<IProgress | null> {
  return await ProgressModel.findById(progressId);
}

// Find progress entries by user ID and course ID
export async function findProgressByUserAndCourse(
  userId: string,
  courseId: string
): Promise<IProgress[]> {
  // Find all topics related to the courseId
  const topics = await findTopicsByCourseId(courseId);
  if (topics == null) {
    return [];
  }
  // Extract topicIds from topics
  const topicIds = topics.map((topic) => topic._id);
  // Find all progress related to the user and topics
  return await ProgressModel.find({ user: userId, topic: { $in: topicIds } });
}

// Find progress entries by user ID and topic ID
export async function findProgressByUserAndTopic(
  userId: string,
  topicIds: string[]
): Promise<IProgress[] | null> {
  return await ProgressModel.find({ user: userId, topic: { $in: topicIds } });
}

// Update a progress entry by ID
export async function updateProgressById(
  progressId: string,
  progressData: Partial<IProgress>
): Promise<IProgress | null> {
  return await ProgressModel.findByIdAndUpdate(progressId, progressData, {
    new: true,
  });
}

// Delete a progress entry by ID
export async function deleteProgressById(
  progressId: string
): Promise<IProgress | null> {
  return await ProgressModel.findByIdAndDelete(progressId);
}

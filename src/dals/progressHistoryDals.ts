import ProgressHistoryModel from '../models/progressHistoryModel';
import { IProgressHistory } from '../types/Learning/IProgressHistory';
import { findProgressByUserAndTopic } from './progressDals';
import { findTopicsByCourseId } from './topicDals';

// Create a new progress history entry
export async function createProgressHistory(
  progressHistoryData: Partial<IProgressHistory>
): Promise<IProgressHistory> {
  const progressHistory = new ProgressHistoryModel(progressHistoryData);
  return await progressHistory.save();
}

// Find all progress history entries
export async function findProgressHistory(): Promise<IProgressHistory[]> {
  return await ProgressHistoryModel.find();
}

// Find a progress history entry by ID
export async function findProgressHistoryById(
  progressHistoryId: string
): Promise<IProgressHistory | null> {
  return await ProgressHistoryModel.findById(progressHistoryId);
}

// Find progress history entries by user ID and course ID
export async function findProgressHistoryByUserAndCourse(
  userId: string,
  courseId: string
): Promise<IProgressHistory[]> {
  // Find all topics related to the courseId
  const topics = await findTopicsByCourseId(courseId);
  // Extract topicIds from topics
  const topicIds = topics?.map((topic) => topic._id);
  // Find all progress related to the user and topics
  const progressEntries = await findProgressByUserAndTopic(
    userId,
    topicIds as string[]
  );
  // Extract progressIds from progress entries
  const progressIds = progressEntries?.map((progress) => progress._id);
  // Find all progress history entries related to the progressIds
  return await ProgressHistoryModel.find({ progress: { $in: progressIds } });
}

// Update a progress history entry by ID
export async function updateProgressHistoryById(
  progressHistoryId: string,
  progressHistoryData: Partial<IProgressHistory>
): Promise<IProgressHistory | null> {
  return await ProgressHistoryModel.findByIdAndUpdate(
    progressHistoryId,
    progressHistoryData,
    {
      new: true,
    }
  );
}

// Delete a progress history entry by ID
export async function deleteProgressHistoryById(
  progressHistoryId: string
): Promise<IProgressHistory | null> {
  return await ProgressHistoryModel.findByIdAndDelete(progressHistoryId);
}

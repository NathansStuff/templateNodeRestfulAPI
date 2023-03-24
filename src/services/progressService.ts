import {
  createProgress,
  findProgress,
  findProgressById,
  findProgressByUserAndCourse,
  updateProgressById,
  deleteProgressById,
} from '../dals/progressDals';
import { sanitizeProgress } from '../sanitizers/progressSanitizer';
import { IProgress } from '../types/Learning/IProgress';

// Create a new progress entry
export async function createNewProgress(
  progressData: IProgress
): Promise<IProgress> {
  const sanitizedProgress = sanitizeProgress(progressData, true);
  const progress = await createProgress(sanitizedProgress);
  return progress;
}

// Get all progress entries
export async function getProgress(): Promise<IProgress[]> {
  const progressEntries = await findProgress();
  return progressEntries;
}

// Get a progress entry by ID
export async function getProgressById(
  progressId: string
): Promise<IProgress | null> {
  const progressEntry = await findProgressById(progressId);
  return progressEntry;
}

// Get progress entries by user ID and course ID
export async function getProgressByUserAndCourse(
  userId: string,
  courseId: string
): Promise<IProgress[]> {
  const progressEntries = await findProgressByUserAndCourse(userId, courseId);
  return progressEntries;
}

// Update a progress entry by ID
export async function updateProgress(
  progressId: string,
  progressData: Partial<IProgress>
): Promise<IProgress | null> {
  const sanitizedProgress = sanitizeProgress(progressData);
  const updatedProgress = await updateProgressById(
    progressId,
    sanitizedProgress
  );
  return updatedProgress;
}

// Delete a progress entry by ID
export async function deleteProgress(
  progressId: string
): Promise<IProgress | null> {
  const deletedProgress = await deleteProgressById(progressId);
  return deletedProgress;
}

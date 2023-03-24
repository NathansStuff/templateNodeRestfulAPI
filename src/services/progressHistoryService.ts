import {
  createProgressHistory,
  findProgressHistory,
  findProgressHistoryById,
  findProgressHistoryByUserAndCourse,
  updateProgressHistoryById,
  deleteProgressHistoryById,
} from '../dals/progressHistoryDals';
import { sanitizeProgressHistory } from '../sanitizers/progressHistorySanitizer';
import { IProgressHistory } from '../types/Learning/IProgressHistory';

// Create a new progress history entry
export async function createNewProgressHistory(
  progressHistoryData: IProgressHistory
): Promise<IProgressHistory> {
  const sanitizedProgressHistory = sanitizeProgressHistory(progressHistoryData);
  const progressHistory = await createProgressHistory(sanitizedProgressHistory);
  return progressHistory;
}

// Get all progress history entries
export async function getProgressHistory(): Promise<IProgressHistory[]> {
  const progressHistoryEntries = await findProgressHistory();
  return progressHistoryEntries;
}

// Get a progress history entry by ID
export async function getProgressHistoryById(
  progressHistoryId: string
): Promise<IProgressHistory | null> {
  const progressHistoryEntry = await findProgressHistoryById(progressHistoryId);
  return progressHistoryEntry;
}

// Get progress history entries by user ID and course ID
export async function getProgressHistoryByUserAndCourse(
  userId: string,
  courseId: string
): Promise<IProgressHistory[]> {
  const progressHistoryEntries = await findProgressHistoryByUserAndCourse(
    userId,
    courseId
  );
  return progressHistoryEntries;
}

// Update a progress history entry by ID
export async function updateProgressHistory(
  progressHistoryId: string,
  progressHistoryData: Partial<IProgressHistory>
): Promise<IProgressHistory | null> {
  const sanitizedProgressHistory = sanitizeProgressHistory(progressHistoryData);
  const updatedProgressHistory = await updateProgressHistoryById(
    progressHistoryId,
    sanitizedProgressHistory
  );
  return updatedProgressHistory;
}

// Delete a progress history entry by ID
export async function deleteProgressHistory(
  progressHistoryId: string
): Promise<IProgressHistory | null> {
  const deletedProgressHistory = await deleteProgressHistoryById(
    progressHistoryId
  );
  return deletedProgressHistory;
}

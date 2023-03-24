import { Response, Request } from 'express';
import {
  getProgressHistory,
  createNewProgressHistory,
  getProgressHistoryById,
  getProgressHistoryByUserAndCourse,
  updateProgressHistory,
  deleteProgressHistory,
} from '../services/progressHistoryService';

// @desc Get all progress history entries
// @route GET /api/progressHistory
// @access Private
export async function getProgressHistoryHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressHistoryEntries = await getProgressHistory();
  return res.status(200).json(progressHistoryEntries);
}

// @desc Create a new progress history entry
// @route POST /api/progressHistory
// @access Private
export async function createProgressHistoryHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressHistoryData = req.body;
  const newProgressHistory = await createNewProgressHistory(
    progressHistoryData
  );
  return res.status(201).json(newProgressHistory);
}

// @desc Get a progress history entry by ID
// @route GET /api/progressHistory/:id
// @access Private
export async function getProgressHistoryByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressHistoryId = req.params.id;
  const progressHistoryEntry = await getProgressHistoryById(progressHistoryId);
  return res.status(200).json(progressHistoryEntry);
}

// @desc Get progress history entries by user ID and course ID
// @route GET /api/progressHistory/user/:userId/course/:courseId
// @access Private
export async function getProgressHistoryByUserAndCourseHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  const progressHistoryEntries = await getProgressHistoryByUserAndCourse(
    userId,
    courseId
  );
  return res.status(200).json(progressHistoryEntries);
}

// @desc Update a progress history entry by ID
// @route PUT /api/progressHistory/:id
// @access Private
export async function updateProgressHistoryHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressHistoryId = req.params.id;
  const progressHistoryData = req.body;
  const updatedProgressHistory = await updateProgressHistory(
    progressHistoryId,
    progressHistoryData
  );
  return res.status(200).json(updatedProgressHistory);
}

// @desc Delete a progress history entry by ID
// @route DELETE /api/progressHistory/:id
// @access Private
export async function deleteProgressHistoryHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressHistoryId = req.params.id;
  const deletedProgressHistory = await deleteProgressHistory(progressHistoryId);
  return res.status(200).json(deletedProgressHistory);
}

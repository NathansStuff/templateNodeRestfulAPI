import { Response, Request } from 'express';
import {
  getProgress,
  createNewProgress,
  getProgressById,
  getProgressByUserAndCourse,
  updateProgress,
  deleteProgress,
} from '../services/progressService';

// @desc Get all progress entries
// @route GET /api/progress
// @access Private
export async function getProgressHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressEntries = await getProgress();
  return res.status(200).json(progressEntries);
}

// @desc Create a new progress entry
// @route POST /api/progress
// @access Private
export async function createProgressHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressData = req.body;
  const newProgress = await createNewProgress(progressData);
  return res.status(201).json(newProgress);
}

// @desc Get a progress entry by ID
// @route GET /api/progress/:id
// @access Private
export async function getProgressByIdHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressId = req.params.id;
  const progressEntry = await getProgressById(progressId);
  return res.status(200).json(progressEntry);
}

// @desc Get progress entries by user ID and course ID
// @route GET /api/progress/user/:userId/course/:courseId
// @access Private
export async function getProgressByUserAndCourseHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  const progressEntries = await getProgressByUserAndCourse(userId, courseId);
  return res.status(200).json(progressEntries);
}

// @desc Update a progress entry by ID
// @route PUT /api/progress/:id
// @access Private
export async function updateProgressHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressId = req.params.id;
  const progressData = req.body;
  const updatedProgress = await updateProgress(progressId, progressData);
  return res.status(200).json(updatedProgress);
}

// @desc Delete a progress entry by ID
// @route DELETE /api/progress/:id
// @access Private
export async function deleteProgressHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const progressId = req.params.id;
  await deleteProgress(progressId);
  return res.status(204).json({ message: 'Progress deleted successfully' });
}

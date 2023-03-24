// learningController.ts

import { Response } from 'express';
import { AuthorizedUserRequest } from '../middleware/authMiddleware';
import { generateContent } from '../services/learningService';

// @desc Generate content for a user based on their progress
// @route GET /api/learning/courses/:courseId/content
// @access Private
export async function generateContentHandler(
  req: AuthorizedUserRequest,
  res: Response
): Promise<Response> {
  const user = req.user;
  const courseId = req.params.courseId;
  if (user == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const generatedContent = await generateContent(user, courseId);
  return res.status(200).json({ content: generatedContent });
}

import express, { RequestHandler } from 'express';
import { generateContentHandler } from '../../controllers/learningController';
import { protect } from '../../middleware/authMiddleware';
import { TryCatchMiddleware } from '../../middleware/TryCatchMiddleware';

const LearningRoutes = express.Router();

LearningRoutes.route('/courses/:courseId/content').get(
  TryCatchMiddleware(protect as RequestHandler),
  TryCatchMiddleware(generateContentHandler as RequestHandler)
);

export default LearningRoutes;

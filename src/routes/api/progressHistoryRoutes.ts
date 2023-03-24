import express, { RequestHandler } from 'express';
import {
  createProgressHistoryHandler,
  deleteProgressHistoryHandler,
  getProgressHistoryByIdHandler,
  getProgressHistoryHandler,
  getProgressHistoryByUserAndCourseHandler,
  updateProgressHistoryHandler,
} from '../../controllers/progressHistoryController';
import { protect } from '../../middleware/authMiddleware';
import { TryCatchMiddleware } from '../../middleware/TryCatchMiddleware';
const ProgressHistoryRoutes = express.Router();

ProgressHistoryRoutes.route('/')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getProgressHistoryHandler as RequestHandler)
  )
  .post(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(createProgressHistoryHandler as RequestHandler)
  );
ProgressHistoryRoutes.route('/:id')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getProgressHistoryByIdHandler as RequestHandler)
  )
  .put(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(updateProgressHistoryHandler as RequestHandler)
  )
  .delete(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(deleteProgressHistoryHandler as RequestHandler)
  );
ProgressHistoryRoutes.route('/user/:userId/course/:courseId').get(
  TryCatchMiddleware(protect as RequestHandler),
  TryCatchMiddleware(getProgressHistoryByUserAndCourseHandler as RequestHandler)
);

export default ProgressHistoryRoutes;

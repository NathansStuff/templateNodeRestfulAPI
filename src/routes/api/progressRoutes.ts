import express, { RequestHandler } from 'express';
import {
  createProgressHandler,
  deleteProgressHandler,
  getProgressByIdHandler,
  getProgressHandler,
  getProgressByUserAndCourseHandler,
  updateProgressHandler,
} from '../../controllers/progressController';
import { protect } from '../../middleware/authMiddleware';
import { TryCatchMiddleware } from '../../middleware/TryCatchMiddleware';
const ProgressRoutes = express.Router();

ProgressRoutes.route('/')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getProgressHandler as RequestHandler)
  )
  .post(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(createProgressHandler as RequestHandler)
  );
ProgressRoutes.route('/:id')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getProgressByIdHandler as RequestHandler)
  )
  .put(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(updateProgressHandler as RequestHandler)
  )
  .delete(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(deleteProgressHandler as RequestHandler)
  );
ProgressRoutes.route('/user/:userId/course/:courseId').get(
  TryCatchMiddleware(protect as RequestHandler),
  TryCatchMiddleware(getProgressByUserAndCourseHandler as RequestHandler)
);

export default ProgressRoutes;

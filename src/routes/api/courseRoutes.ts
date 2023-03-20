import express, { RequestHandler } from 'express';
import {
  createCourseHandler,
  deleteCourseHandler,
  getCourseHandler,
  getCoursesHandler,
  updateCourseHandler,
} from '../../controllers/courseController';
import { protect } from '../../middleware/authMiddleware';
import { TryCatchMiddleware } from '../../middleware/TryCatchMiddleware';
const CourseRoutes = express.Router();

CourseRoutes.route('/');
CourseRoutes.route('/')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getCoursesHandler as RequestHandler)
  )
  .post(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(createCourseHandler as RequestHandler)
  );
CourseRoutes.route('/:id')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getCourseHandler as RequestHandler)
  )
  .put(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(updateCourseHandler as RequestHandler)
  )
  .delete(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(deleteCourseHandler as RequestHandler)
  );

export default CourseRoutes;

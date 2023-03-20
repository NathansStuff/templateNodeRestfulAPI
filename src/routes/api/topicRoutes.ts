import express, { RequestHandler } from 'express';
import {
  createTopicHandler,
  deleteTopicHandler,
  getTopicHandler,
  getTopicsByCourseIdHandler,
  getTopicsHandler,
  updateTopicHandler,
} from '../../controllers/topicController';
import { protect } from '../../middleware/authMiddleware';
import { TryCatchMiddleware } from '../../middleware/TryCatchMiddleware';
const TopicRoutes = express.Router();

TopicRoutes.route('/');
TopicRoutes.route('/')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getTopicsHandler as RequestHandler)
  )
  .post(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(createTopicHandler as RequestHandler)
  );
TopicRoutes.route('/:id')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getTopicHandler as RequestHandler)
  )
  .put(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(updateTopicHandler as RequestHandler)
  )
  .delete(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(deleteTopicHandler as RequestHandler)
  );
TopicRoutes.route('/course/:courseId').get(
  TryCatchMiddleware(protect as RequestHandler),
  TryCatchMiddleware(getTopicsByCourseIdHandler as RequestHandler)
);

export default TopicRoutes;

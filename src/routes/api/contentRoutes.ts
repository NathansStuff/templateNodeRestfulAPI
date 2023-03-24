import express, { RequestHandler } from 'express';
import {
  getAllContentHandler,
  createContentHandler,
  getContentHandler,
  updateContentHandler,
  deleteContentHandler,
  getContentByTopicHandler,
} from '../../controllers/contentController';
import { protect } from '../../middleware/authMiddleware';
import { TryCatchMiddleware } from '../../middleware/TryCatchMiddleware';
const ContentRoutes = express.Router();

// Routes for /api/content
ContentRoutes.route('/')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getAllContentHandler as RequestHandler)
  )
  .post(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(createContentHandler as RequestHandler)
  );

// Routes for /api/content/:id
ContentRoutes.route('/:id')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(getContentHandler as RequestHandler)
  )
  .put(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(updateContentHandler as RequestHandler)
  )
  .delete(
    TryCatchMiddleware(protect as RequestHandler),
    TryCatchMiddleware(deleteContentHandler as RequestHandler)
  );

// Route for /api/content/topic/:topicId
ContentRoutes.route('/topic/:topicId').get(
  TryCatchMiddleware(protect as RequestHandler),
  TryCatchMiddleware(getContentByTopicHandler as RequestHandler)
);

export default ContentRoutes;

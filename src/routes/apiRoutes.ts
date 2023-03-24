import userRoutes from './api/userRoutes';
import { RequestHandler, Router } from 'express';
import CourseRoutes from './api/courseRoutes';
import TopicRoutes from './api/topicRoutes';
import ProgressRoutes from './api/progressRoutes';
import ProgressHistoryRoutes from './api/progressHistoryRoutes';
import ContentRoutes from './api/contentRoutes';
import LearningRoutes from './api/learningRoutes';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes as RequestHandler);
apiRoutes.use('/courses', CourseRoutes as RequestHandler);
apiRoutes.use('/topics', TopicRoutes as RequestHandler);
apiRoutes.use('/progress', ProgressRoutes as RequestHandler);
apiRoutes.use('/progressHistory', ProgressHistoryRoutes as RequestHandler);
apiRoutes.use('/content', ContentRoutes as RequestHandler);
apiRoutes.use('/learning', LearningRoutes as RequestHandler);

export default apiRoutes;

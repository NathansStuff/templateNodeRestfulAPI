import PokemonRoutes from './api/pokemonRoutes';
import userRoutes from './api/userRoutes';
import { RequestHandler, Router } from 'express';
import CourseRoutes from './api/courseRoutes';
import TopicRoutes from './api/topicRoutes';

const apiRoutes = Router();

apiRoutes.use('/pokemon', PokemonRoutes as RequestHandler);
apiRoutes.use('/users', userRoutes as RequestHandler);
apiRoutes.use('/courses', CourseRoutes as RequestHandler);
apiRoutes.use('/topics', TopicRoutes as RequestHandler);

export default apiRoutes;

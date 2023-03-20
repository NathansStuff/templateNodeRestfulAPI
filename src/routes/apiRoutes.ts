import PokemonRoutes from './api/pokemonRoutes';
import userRoutes from './api/userRoutes';
import { RequestHandler, Router } from 'express';
import CourseRoutes from './api/courseRoutes';

const apiRoutes = Router();

apiRoutes.use('/pokemon', PokemonRoutes as RequestHandler);
apiRoutes.use('/users', userRoutes as RequestHandler);
apiRoutes.use('/courses', CourseRoutes as RequestHandler);

export default apiRoutes;

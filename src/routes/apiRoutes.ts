import PokemonRoutes from './api/pokemonRoutes';
import userRoutes from './api/userRoutes';
import { RequestHandler, Router } from 'express';

const apiRoutes = Router();

apiRoutes.use('/pokemon', PokemonRoutes as RequestHandler);
apiRoutes.use('/users', userRoutes as RequestHandler);

export default apiRoutes;

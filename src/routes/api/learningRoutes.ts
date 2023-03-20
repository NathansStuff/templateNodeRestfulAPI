import express, { RequestHandler } from 'express';
import {
  getPokemonsHandler,
  createPokemonHandler,
  getPokemonHandler,
  updatePokemonHandler,
  deletePokemonHandler,
} from '../../controllers/pokemonController';
import { protect } from '../../middleware/authMiddleware';
import { TryCatchMiddleware } from '../../middleware/TryCatchMiddleware';
const LearningRoutes = express.Router();

LearningRoutes.route('/');
LearningRoutes.route('/')
  .get(
    TryCatchMiddleware(protect as RequestHandler),
    getPokemonsHandler as RequestHandler
  )
  .post(protect as RequestHandler, createPokemonHandler as RequestHandler);
LearningRoutes.route('/:id')
  .get(getPokemonHandler as RequestHandler)
  .put(protect as RequestHandler, updatePokemonHandler as RequestHandler)
  .delete(protect as RequestHandler, deletePokemonHandler as RequestHandler);

export default LearningRoutes;

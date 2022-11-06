import express, { RequestHandler } from 'express';
import {
  getPokemonsHandler,
  createPokemonHandler,
  getPokemonHandler,
  updatePokemonHandler,
  deletePokemonHandler,
} from '../../controllers/pokemonController';
import { protect } from '../../middleware/authMiddleware';
const PokemonRoutes = express.Router();

PokemonRoutes.route('/');
PokemonRoutes.route('/')
  .get(protect as RequestHandler, getPokemonsHandler as RequestHandler)
  .post(protect as RequestHandler, createPokemonHandler as RequestHandler);
PokemonRoutes.route('/:id')
  .get(getPokemonHandler as RequestHandler)
  .put(protect as RequestHandler, updatePokemonHandler as RequestHandler)
  .delete(protect as RequestHandler, deletePokemonHandler as RequestHandler);

export default PokemonRoutes;

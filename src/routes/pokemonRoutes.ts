import express from 'express';
import { protect } from '../middleware/authMiddleware';

import {
    getPokemonsHandler,
    createPokemonHandler,
    getPokemonHandler,
    deletePokemonHandler,
    updatePokemonHandler,
} from '../controllers/PokemonController';
const PokemonRoutes = express.Router();

PokemonRoutes.route('/')
    .get(getPokemonsHandler)
    .post(protect, createPokemonHandler);
PokemonRoutes.route('/:id')
    .get(getPokemonHandler)
    .put(protect, updatePokemonHandler)
    .delete(protect, deletePokemonHandler);

export default PokemonRoutes;

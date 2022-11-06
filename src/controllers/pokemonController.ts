import { Response, Request } from 'express';
import { AuthorizedUserRequest } from '../middleware/authMiddleware';

import {
  createPokemon,
  deletePokemon,
  getPokemonById,
  getPokemons,
  updatePokemon,
} from '../services/pokemonService';

// @desc Get all Pokemons
// @route GET /api/Pokemons
// @access Public
export async function getPokemonsHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const Pokemons = await getPokemons();
  return res.status(200).json(Pokemons);
}
// @desc Create a new Pokemon
// @route POST /api/Pokemons
// @access Private
export async function createPokemonHandler(
  req: AuthorizedUserRequest,
  res: Response
): Promise<void> {
  const createdPokemon = await createPokemon(req.body, req.user?._id);

  res.status(201).json(createdPokemon);
}

// @desc Get a Pokemon by id
// @route GET /api/Pokemons/:id
// @access Public
export async function getPokemonHandler(
  req: Request,
  res: Response
): Promise<Response> {
  const Pokemon = await getPokemonById(req.params.id);
  return res.status(200).json(Pokemon);
}

// @desc Delete a Pokemon by id
// @route DELETE /api/Pokemons/:id
// @access Private
export async function deletePokemonHandler(
  req: AuthorizedUserRequest,
  res: Response
): Promise<Response> {
  const deletedPokemon = await deletePokemon(req.params.id, req.user?._id);
  return res.status(200).json(deletedPokemon);
}

// @desc Update a Pokemon by id
// @route PUT /api/Pokemons/:id
// @access Private
export async function updatePokemonHandler(
  req: AuthorizedUserRequest,
  res: Response
): Promise<Response> {
  const updatedPokemon = await updatePokemon(
    req.params.id,
    req.body,
    req.user?._id
  );
  return res.status(200).json(updatedPokemon);
}

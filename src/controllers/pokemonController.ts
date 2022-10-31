import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
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
export const getPokemonsHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const Pokemons = await getPokemons();
        res.status(200).json(Pokemons);
    }
);

// @desc Create a new Pokemon
// @route POST /api/Pokemons
// @access Private
export const createPokemonHandler = asyncHandler(
    async (req: AuthorizedUserRequest, res: Response) => {
        const createdPokemon = await createPokemon(req.body, req.user?._id);

        res.status(201).json(createdPokemon);
    }
);

// @desc Get a Pokemon by id
// @route GET /api/Pokemons/:id
// @access Public
export const getPokemonHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const Pokemon = await getPokemonById(req.params.id);

        res.status(200).json(Pokemon);
    }
);

// @desc Delete a Pokemon by id
// @route DELETE /api/Pokemons/:id
// @access Private
export const deletePokemonHandler = asyncHandler(
    async (req: AuthorizedUserRequest, res: Response) => {
        await deletePokemon(req.params.id, req.user?._id);

        res.status(200).json({
            message: `Pokemon ${req.params.id} deleted`,
        });
    }
);

// @desc Update a Pokemon by id
// @route PUT /api/Pokemons/:id
// @access Private
export const updatePokemonHandler = asyncHandler(
    async (req: AuthorizedUserRequest, res: Response) => {
        const Pokemon = await updatePokemon(
            req.params.id,
            req.body,
            req.user?._id
        );

        res.json(Pokemon);
    }
);

import { checkIsValidObjectId } from '../database/db';
import PokemonModel from '../models/PokemonModel';
import { sanitizePokemon } from '../sanitizers/PokemonSanitizer';
import { sanitizeId } from '../sanitizers/userSanitizer';
import { IPokemonSchema } from '../schema/PokemonSchema';
import { PokemonType } from '../types/PokemonTypes';
import HttpException, { ErrorHandler } from '../utils/httpException';

export async function getPokemons(): Promise<PokemonType[]> {
    try {
        const Pokemons = await PokemonModel.find();

        return Pokemons;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function createPokemon(
    Pokemon: PokemonType,
    userId: string | undefined
): Promise<PokemonType> {
    const sanitizedPokemon = sanitizePokemon(Pokemon, userId);

    try {
        const newPokemon = await PokemonModel.create(sanitizedPokemon);

        return newPokemon;
    } catch (err: unknown) {
        throw ErrorHandler(err);
    }
}

export async function getPokemonById(
    PokemonId: string
): Promise<IPokemonSchema> {
    checkIsValidObjectId(PokemonId);
    try {
        const Pokemon = await PokemonModel.findById(PokemonId);
        if (Pokemon == null) throw new Error('Pokemon not found');

        return Pokemon;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function updatePokemon(
    PokemonId: string,
    Pokemon: PokemonType,
    userId: string | undefined
): Promise<IPokemonSchema> {
    checkIsValidObjectId(PokemonId);

    await isUserAuthorized(userId, PokemonId);

    const sanitizedPokemon = sanitizePokemon(Pokemon, userId);

    try {
        const updatedPokemon = await PokemonModel.findByIdAndUpdate(
            PokemonId,
            sanitizedPokemon,
            { new: true }
        );
        if (updatedPokemon == null) throw new Error('Pokemon not found');

        return updatedPokemon;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

export async function deletePokemon(
    PokemonId: string,
    userId: string | undefined
): Promise<void> {
    checkIsValidObjectId(PokemonId);
    await isUserAuthorized(userId, PokemonId);

    try {
        const Pokemon = await PokemonModel.findByIdAndDelete(PokemonId);
        if (Pokemon == null) throw new Error('Pokemon not found');

        return;
    } catch (err) {
        throw ErrorHandler(err);
    }
}

async function isUserAuthorized(
    userId: string | undefined,
    PokemonId: string
): Promise<void> {
    const sanitizedUserId = sanitizeId(userId);
    const PokemonToUpdate = await getPokemonById(PokemonId);

    if (sanitizedUserId !== PokemonToUpdate.userId) {
        throw new HttpException(
            'You are not authorized to perform this action',
            401
        );
    }
}

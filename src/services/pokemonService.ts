import { checkIsValidObjectId } from '../database/db';
import AuthenticationError from '../middleware/Errors/AuthenticationError';
import PokemonModel from '../models/PokemonModel';
import { sanitizePokemon } from '../sanitizers/PokemonSanitizer';
import { sanitizeId } from '../sanitizers/userSanitizer';
import { IPokemonSchema } from '../schema/PokemonSchema';
import { PokemonType } from '../types/PokemonTypes';

export async function getPokemons(): Promise<PokemonType[]> {
  const Pokemons = await PokemonModel.find();
  return Pokemons;
}

export async function createPokemon(
  Pokemon: PokemonType,
  userId: string | undefined
): Promise<PokemonType> {
  const sanitizedPokemon = sanitizePokemon(Pokemon, userId);
  const newPokemon = await PokemonModel.create(sanitizedPokemon);
  return newPokemon;
}

export async function getPokemonById(
  PokemonId: string
): Promise<IPokemonSchema> {
  checkIsValidObjectId(PokemonId);
  const Pokemon = await PokemonModel.findById(PokemonId);
  if (Pokemon == null) throw new Error('Pokemon not found');
  return Pokemon;
}

export async function updatePokemon(
  PokemonId: string,
  Pokemon: PokemonType,
  userId: string | undefined
): Promise<IPokemonSchema> {
  checkIsValidObjectId(PokemonId);
  await isUserAuthorized(userId, PokemonId);
  const sanitizedPokemon = sanitizePokemon(Pokemon, userId);
  const updatedPokemon = await PokemonModel.findByIdAndUpdate(
    PokemonId,
    sanitizedPokemon,
    { new: true }
  );
  if (updatedPokemon == null) throw new Error('Pokemon not found');
  return updatedPokemon;
}

export async function deletePokemon(
  PokemonId: string,
  userId: string | undefined
): Promise<void> {
  checkIsValidObjectId(PokemonId);
  await isUserAuthorized(userId, PokemonId);
  const Pokemon = await PokemonModel.findByIdAndDelete(PokemonId);
  if (Pokemon == null) throw new Error('Pokemon not found');
}

async function isUserAuthorized(
  userId: string | undefined,
  PokemonId: string
): Promise<void> {
  const sanitizedUserId = sanitizeId(userId);
  const PokemonToUpdate = await getPokemonById(PokemonId);
  if (sanitizedUserId !== PokemonToUpdate.userId) {
    throw new AuthenticationError();
  }
}

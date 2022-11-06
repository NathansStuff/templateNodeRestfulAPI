import BadRequestError from '../middleware/Errors/BadRequestError';
import { PokemonType } from '../types/PokemonTypes';
import { sanitizeId } from './userSanitizer';

export function sanitizePokemon(
  Pokemon: PokemonType,
  userId: string | undefined
): PokemonType {
  const sanitzedId = sanitizeId(userId);
  const sanitizedPokemon: PokemonType = {
    userId: sanitzedId,
    name: '',
  };

  sanitizedPokemon.name = sanitizeName(Pokemon.name);

  return sanitizedPokemon;
}

function sanitizeName(name: string): string {
  // Types
  if (name === undefined) {
    throw new BadRequestError('Name is undefined');
  }
  if (typeof name !== 'string') {
    throw new BadRequestError('Name is not a string');
  }

  // Attributes
  name = name.trim();
  if (name.length < 3) {
    throw new BadRequestError('Name must be at least 3 characters');
  }
  if (name.length > 50) {
    throw new BadRequestError('Name mut be less then 50 characters');
  }

  return name;
}

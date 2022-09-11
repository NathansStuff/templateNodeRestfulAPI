import { PokemonType } from '../types/PokemonTypes';
import HttpException from '../utils/httpException';
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
        throw new HttpException('Name is undefined', 400);
    }
    if (typeof name !== 'string') {
        throw new HttpException('Name is not a string', 400);
    }

    // Attributes
    name = name.trim();
    if (name.length < 3) {
        throw new HttpException('Name must be at least 3 characters', 400);
    }
    if (name.length > 50) {
        throw new HttpException('Name mut be less then 50 characters', 400);
    }

    return name;
}

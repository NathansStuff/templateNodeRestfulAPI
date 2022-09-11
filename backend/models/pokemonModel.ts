import { model } from 'mongoose';
import PokemonSchema, { IPokemonSchema } from '../schema/PokemonSchema';

const PokemonModel = model<IPokemonSchema>('Pokemon', PokemonSchema);

export default PokemonModel;

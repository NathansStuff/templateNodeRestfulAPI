import { Schema } from 'mongoose';
import { PokemonType } from '../types/PokemonTypes';

export interface IPokemonSchema extends PokemonType {
  _id: string;
}

const PokemonSchema = new Schema<PokemonType>(
  {
    userId: { type: String, required: true },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default PokemonSchema;

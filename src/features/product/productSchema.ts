import { Schema } from 'mongoose';

import { IProduct } from './IProduct';

export const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        criteriaGroupIds: {
            type: [String],
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

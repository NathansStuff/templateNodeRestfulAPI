import { Schema } from 'mongoose';

import { ILender } from './ILender';

export const LenderSchema = new Schema<ILender>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        code: {
            type: String,
            required: true,
        },
        productIds: {
            type: [String],
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

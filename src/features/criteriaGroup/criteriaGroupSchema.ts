import { Schema } from 'mongoose';

import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ERuleOptions } from '@/types/ERuleOptions';

import { ICriteriaGroup } from './ICriteria';

export const CriteriaGroupSchema = new Schema<ICriteriaGroup>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        rules: [
            {
                type: { type: String, enum: Object.values(ERuleOptions) },
                criteria: {
                    type: { type: String, enum: Object.values(ECriteriaType) },
                    name: String,
                    min: Number,
                    max: Number,
                    options: [String],
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

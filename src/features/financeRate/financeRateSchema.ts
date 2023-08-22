import { Schema } from 'mongoose';

import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ERuleOptions } from '@/types/enums/ERuleOptions';

import { IFinanceRate } from './IFinanceRate';

export const FinanceRateSchema = new Schema<IFinanceRate>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        rule: {
            type: {
                type: String,
                enum: Object.values(ERuleOptions),
            },
            criteria: {
                min: Number,
                max: Number,
                value: Number,
                options: [String],
                record: {
                    type: Map,
                    of: Number,
                },
                type: {
                    type: String,
                    enum: Object.values(ECriteriaType),
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

import { Schema } from 'mongoose';

import { InfoWithId } from './infoType';

export const InfoSchema = new Schema<InfoWithId>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        text: {
            type: String,
            required: true,
        },
        metadata: {
            title: {
                type: String,
                required: true,
            },
            pageNumber: {
                type: Number,
                required: true,
            },
        },
        savedInPinecone: {
            type: Boolean,
            required: true,
        },
        namespace: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

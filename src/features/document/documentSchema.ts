import { Schema } from 'mongoose';

import { DocumentWithId } from './documentType';

export const DocumentSchema = new Schema<DocumentWithId>(
    {
        name: {
            type: String,
            required: true,
        },
        infoIds: {
            type: [String],
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

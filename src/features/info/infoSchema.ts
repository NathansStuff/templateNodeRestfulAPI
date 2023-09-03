import { Schema } from 'mongoose';

import { InfoWithId } from './infoType';

export const InfoSchema = new Schema<InfoWithId>(
    {
        friendlyTitle: { type: String, required: true },
        sourceLink: { type: String, required: true },
        aiText: { type: String, required: true },
        tokens: { type: Number, required: true },
        componentType: { type: String, required: true },
        metadata: {
            countryCode: { type: String, required: true },
            industry: { type: String, required: true },
            promptTemplate: { type: String, required: true },
            infoType: { type: String, required: true },
            sourceName: { type: String, required: true },
            title: { type: String, required: true },
            pageNumbers: { type: [Number], required: false },
            embeddedText: { type: String, required: true },
        },
        namespace: { type: String, required: true },
        savedInPinecone: { type: Boolean, required: true },
    },
    {
        timestamps: true,
    }
);

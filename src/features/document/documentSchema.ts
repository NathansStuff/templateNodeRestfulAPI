import { Schema } from 'mongoose';

import {
    EComponentType,
    ECountryCode,
    EIndustry,
    EInfoType,
    EPromptTemplate,
} from '@/types';

import { DocumentWithId } from './documentType';

export const DocumentSchema = new Schema<DocumentWithId>(
    {
        documentName: { type: String, required: true },
        infoIds: { type: [String], default: [] },

        // Default values for new info
        defaultFriendlyTitle: { type: String, required: true },
        defaultSourceLink: { type: String, required: true },
        defaultComponentType: {
            type: String,
            required: true,
            enum: Object.values(EComponentType),
        },
        defaultMetadata: {
            countryCode: {
                type: String,
                required: true,
                enum: Object.values(ECountryCode),
            },
            industry: {
                type: String,
                required: true,
                enum: Object.values(EIndustry),
            },
            promptTemplate: {
                type: String,
                required: true,
                enum: Object.values(EPromptTemplate),
            },
            infoType: {
                type: String,
                required: true,
                enum: Object.values(EInfoType),
            },
            sourceName: { type: String, required: true },
            title: { type: String, required: true },
        },

        defaultNamespace: { type: String, required: true },

        // Chunk info
        fullText: { type: String, required: true },
        chunkSize: { type: Number, required: true },
        chunkOverlap: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

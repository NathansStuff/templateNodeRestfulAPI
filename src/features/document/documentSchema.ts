import { Schema } from 'mongoose';

import { EAiInfoTemplate, EComponentType, ECountryCode, EEmbedTemplate, EIndustry } from '@/types';

import { DocumentWithId } from './documentType';

export const DocumentSchema = new Schema<DocumentWithId>(
    {
        documentName: { type: String, required: true },
        infoIds: { type: [String], default: [] },

        // Default values for new info
        defaultFriendlyTitle: { type: String, required: true },
        defaultSourceLink: { type: String, required: true },
        defaultComponentType: { type: String, required: true },
        defaultMetadata: {
            general: {
                countryCode: {
                    type: String,
                    required: true,
                    enum: ECountryCode,
                },
                industry: {
                    type: String,
                    required: true,
                    enum: EIndustry,
                },
                sourceLink: {
                    type: String,
                    required: true,
                },
                sourceName: {
                    type: String,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
            },
            ai: {
                aiTemplate: {
                    type: String,
                    required: true,
                    enum: EAiInfoTemplate,
                },
            },
            embedded: {
                embeddedTemplate: {
                    type: String,
                    required: true,
                    enum: EEmbedTemplate,
                },
            },
            ui: {
                uiTitle: {
                    type: String,
                    required: true,
                },
                uiText: {
                    type: String,
                    required: true,
                },
                componentType: {
                    type: String,
                    required: true,
                    enum: EComponentType,
                },
            },
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

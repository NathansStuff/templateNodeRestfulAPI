import { Schema } from 'mongoose';

import {
    EAiInfoTemplate,
    EComponentType,
    ECountryCode,
    EEmbedTemplate,
    EIndustry,
    EPromptTemplate,
} from '@/types/enums';

import { InfoWithId } from './infoType';

export const InfoSchema = new Schema<InfoWithId>(
    {
        chunkedText: {
            type: String,
            required: true,
        },
        metadata: {
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
                pageNumbers: {
                    type: [Number],
                    required: false,
                },
            },
            ai: {
                aiText: {
                    type: String,
                    required: true,
                },
                aiTemplate: {
                    type: String,
                    required: true,
                    enum: EAiInfoTemplate,
                },
                aiTokens: {
                    type: Number,
                    required: true,
                },
            },
            embedded: {
                embeddedText: {
                    type: String,
                    required: true,
                },
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
                promptTemplate: {
                    type: String,
                    required: true,
                    enum: EPromptTemplate,
                },
            },
        },
        namespace: {
            type: String,
            required: true,
        },
        savedInPinecone: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

import { WithId } from 'mongodb';
import * as z from 'zod';

import {
    EAiInfoTemplate,
    EComponentType,
    ECountryCode,
    EEmbedTemplate,
    EIndustry,
} from '@/types/enums';

export const InfoRequest = z.object({
    chunkedText: z.string(),
    metadata: z.object({
        general: z.object({
            countryCode: z.nativeEnum(ECountryCode), // eg AUS
            industry: z.nativeEnum(EIndustry), // eg Construction
            sourceLink: z.string(), // link to source of data - full link
            sourceName: z.string(), // eg full law name
            title: z.string(),
            pageNumbers: z.array(z.number()).optional(), // page number of the vector
        }),
        ai: z.object({
            aiTemplate: z.nativeEnum(EAiInfoTemplate), // eg Standard - what template was used to take text => aiText
        }),
        embedded: z.object({
            embeddedTemplate: z.nativeEnum(EEmbedTemplate), // eg LawReference => Used for building the vector text from the chunkedText
        }),
        ui: z.object({
            uiTitle: z.string(), // title, user facing
            uiText: z.string(), // Text to show the user
            componentType: z.nativeEnum(EComponentType), // eg Passage => Used for deciding UI component
        }),
    }),
    namespace: z.string(),
});

export type InfoRequest = z.infer<typeof InfoRequest>;

export const Info = z.object({
    chunkedText: z.string(),
    metadata: z.object({
        general: z.object({
            countryCode: z.nativeEnum(ECountryCode), // eg AUS
            industry: z.nativeEnum(EIndustry), // eg Construction
            sourceLink: z.string(), // link to source of data - full link
            sourceName: z.string(), // eg full law name
            title: z.string(),
            pageNumbers: z.array(z.number()).optional(), // page number of the vector
        }),
        ai: z.object({
            aiText: z.string(), // text we send to openai
            aiTemplate: z.nativeEnum(EAiInfoTemplate), // eg Standard - what template was used to take text => aiText
            aiTokens: z.number(), // tokens of the text to openai
        }),
        embedded: z.object({
            embeddedText: z.string(), // embedded text into
            embeddedTemplate: z.nativeEnum(EEmbedTemplate), // eg LawReference => Used for building the vector text from the chunkedText
        }),
        ui: z.object({
            uiTitle: z.string(), // title, user facing
            uiText: z.string(), // Text to show the user
            componentType: z.nativeEnum(EComponentType), // eg Passage => Used for deciding UI component
        }),
    }),

    // Not saved into pinecone
    namespace: z.string(),
    savedInPinecone: z.boolean().default(false),
});

export type Info = z.infer<typeof Info>;
export type InfoWithId = WithId<Info>;

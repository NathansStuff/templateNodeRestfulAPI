import * as z from 'zod';

import {
    EAiInfoTemplate,
    EComponentType,
    ECountryCode,
    EEmbedTemplate,
    EIndustry,
} from '@/types/enums';

export const VectorEmbedRequestType = z.object({
    // same as VectorType
    // No values
    id: z.string(), // mongoId
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
});

export type VectorEmbedRequestType = z.infer<typeof VectorEmbedRequestType>;

// Note: Vector service will calculate the values
// From embeddedText in the request
export const VectorType = VectorEmbedRequestType.extend({
    values: z.array(z.number()),
});

export type VectorType = z.infer<typeof VectorType>;

export const NamespaceType = z.string().optional();
export type NamespaceType = z.infer<typeof NamespaceType>;

export const EmbedAndUpsertVectorsRequestType = z.object({
    vectors: z.array(VectorEmbedRequestType),
    namespace: NamespaceType,
});
export type EmbedAndUpsertVectorsRequestType = z.infer<
    typeof EmbedAndUpsertVectorsRequestType
>;

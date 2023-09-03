import * as z from 'zod';

import {
    EComponentType,
    ECountryCode,
    EIndustry,
    EInfoType,
    EPromptTemplate,
} from '@/types/enums';

export const VectorType = z.object({
    id: z.string(), // mongoId
    friendlyTitle: z.string(), // title, user facing
    sourceLink: z.string(), // link to source of data - full link
    aiText: z.string(), // text we send to gpt
    tokens: z.number(), // tokens of the text to gpt
    values: z.array(z.number()), // vector values => What is used for similarity
    componentType: z.nativeEnum(EComponentType), // eg Passage => Used for deciding UI component
    metadata: z.object({
        countryCode: z.nativeEnum(ECountryCode), // eg AUS
        industry: z.nativeEnum(EIndustry), // eg Construction
        promptTemplate: z.nativeEnum(EPromptTemplate), // eg Standard - what template was used to take text => aiText
        infoType: z.nativeEnum(EInfoType), // eg LawReference => Used for building the vector text
        sourceName: z.string(), // eg full law name
        title: z.string(),
        pageNumbers: z.array(z.number()).optional(), // page number of the vector
        embeddedText: z.string(), // text of the vector
    }),
});

export type VectorType = z.infer<typeof VectorType>;

export const VectorEmbedRequestType = z.object({
    id: z.string(), // MongoId
    friendlyTitle: z.string(), // title, user facing
    sourceLink: z.string(), // link to source of data - full link
    aiText: z.string(), // text we send to gpt
    tokens: z.number(), // tokens of the text to gpt
    componentType: z.nativeEnum(EComponentType), // eg Passage => Used for deciding UI component
    metadata: z.object({
        countryCode: z.nativeEnum(ECountryCode), // eg AUS
        industry: z.nativeEnum(EIndustry), // eg Construction
        promptTemplate: z.nativeEnum(EPromptTemplate), // eg Standard - what template was used to take text => aiText
        infoType: z.nativeEnum(EInfoType), // eg LawReference => Used for building the vector text
        sourceName: z.string(), // eg full law name
        title: z.string(),
        pageNumbers: z.array(z.number()).optional(), // page number of the vector
        embeddedText: z.string(), // text of the vector
    }),
});

export type VectorEmbedRequestType = z.infer<typeof VectorEmbedRequestType>;

export const NamespaceType = z.string().optional();
export type NamespaceType = z.infer<typeof NamespaceType>;

export const EmbedAndUpsertVectorsRequestType = z.object({
    vectors: z.array(VectorEmbedRequestType),
    namespace: NamespaceType,
});
export type EmbedAndUpsertVectorsRequestType = z.infer<
    typeof EmbedAndUpsertVectorsRequestType
>;

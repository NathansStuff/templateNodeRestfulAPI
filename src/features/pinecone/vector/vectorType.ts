import * as z from 'zod';

export const VectorType = z.object({
    id: z.string(), // id
    label: z.string(), // title, user facing
    source: z.string(), // link to source of data - full link
    aiText: z.string(), // text we send to gpt
    tokens: z.number(), // tokens of the text to gpt
    values: z.array(z.number()), // vector values => What is used for similarity
    type: z.string(), // eg Passage => Used for deciding UI component
    metadata: z.object({
        countryCode: z.string(), // eg AUS
        industry: z.string(), // eg Construction
        template: z.string(), // eg Standard - what template was used to take text => aiText
        type: z.string(), // eg LawReference => Used for building the vector text
        sourceName: z.string(), // eg full law name
        title: z.string(),
        pageNumbers: z.array(z.number()).optional(), // page number of the vector
        text: z.string(), // text of the vector
    }),
});

export type VectorType = z.infer<typeof VectorType>;

export const VectorEmbedRequestType = z.object({
    id: z.string(),
    metadata: z.object({
        title: z.string(),
        pageNumber: z.number(),
        text: z.string(),
    }),
});

export type VectorEmbedRequestType = z.infer<typeof VectorEmbedRequestType>;

export const NamespaceType = z.string().optional();
export type NamespaceType = z.infer<typeof NamespaceType>;

export const EmbedAndUpsertVectorsRequestType = z.object({
    vectors: z.array(VectorEmbedRequestType),
    namespace: NamespaceType,
});
export type EmbedAndUpsertVectorsRequestType = z.infer<typeof EmbedAndUpsertVectorsRequestType>;

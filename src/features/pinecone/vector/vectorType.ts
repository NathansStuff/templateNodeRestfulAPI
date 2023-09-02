import * as z from 'zod';

export const VectorType = z.object({
    id: z.string(),
    values: z.array(z.number()),
    metadata: z.object({
        title: z.string(),
        pageNumber: z.number(),
        text: z.string(),
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

import { WithId } from 'mongodb';
import * as z from 'zod';

export const Info = z.object({
    id: z.string(),
    text: z.string(),
    metadata: z.object({
        title: z.string(),
        pageNumber: z.number(),
    }),
    namespace: z.string(),
});

export type Info = z.infer<typeof Info>;
export type InfoWithId = WithId<Info>;

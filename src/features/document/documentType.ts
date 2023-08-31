import { WithId } from 'mongodb';
import * as z from 'zod';

export const Document = z.object({
    name: z.string(),
    infoIds: z.array(z.string()),
    namespace: z.string(),
});

export type Document = z.infer<typeof Document>;
export type DocumentWithId = WithId<Document>;

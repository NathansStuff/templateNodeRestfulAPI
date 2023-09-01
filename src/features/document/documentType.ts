import { WithId } from 'mongodb';
import * as z from 'zod';

import { InfoWithId } from '@/features/info/infoType';

export const Document = z.object({
    name: z.string(),
    infoIds: z.array(z.string()).default([]),
    namespace: z.string(),
});

export type Document = z.infer<typeof Document>;
export type DocumentWithId = WithId<Document>;

export type DocumentWithInfoIds = {
    name: string;
    infoIds: (InfoWithId | null)[];
    namespace: string;
};
export type DocumentWithInfoIdsAndId = DocumentWithId & DocumentWithInfoIds;

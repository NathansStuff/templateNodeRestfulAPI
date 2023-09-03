import { WithId } from 'mongodb';
import * as z from 'zod';

import { InfoWithId } from '@/features/info/infoType';
import {
    EComponentType,
    ECountryCode,
    EIndustry,
    EInfoType,
    EPromptTemplate,
} from '@/types';

export const Document = z.object({
    documentName: z.string(),
    infoIds: z.array(z.string()).default([]),

    // Default values for new info
    defaultFriendlyTitle: z.string(),
    defaultSourceLink: z.string(),
    defaultComponentType: z.nativeEnum(EComponentType),
    defaultMetadata: z.object({
        countryCode: z.nativeEnum(ECountryCode),
        industry: z.nativeEnum(EIndustry),
        promptTemplate: z.nativeEnum(EPromptTemplate),
        infoType: z.nativeEnum(EInfoType),
        sourceName: z.string(),
        title: z.string(),
    }),

    defaultNamespace: z.string(),

    // Chunk info
    fullText: z.string(),
    chunkSize: z.number(),
    chunkOverlap: z.number(),
});

export type Document = z.infer<typeof Document>;
export type DocumentWithId = WithId<Document>;

export type DocumentWithInfoIds = {
    name: string;
    infoIds: (InfoWithId | null)[];
    namespace: string;
};
export type DocumentWithInfoIdsAndId = DocumentWithId & DocumentWithInfoIds;

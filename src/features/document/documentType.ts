import { WithId } from 'mongodb';
import * as z from 'zod';

import { InfoWithId } from '@/features/info/infoType';
import { EAiInfoTemplate, EComponentType, ECountryCode, EEmbedTemplate, EIndustry } from '@/types';

export const Document = z.object({
    documentName: z.string(),
    infoIds: z.array(z.string()).default([]),

    // Default values for new info
    defaultFriendlyTitle: z.string(),
    defaultSourceLink: z.string(),
    defaultMetadata: z.object({
        general: z.object({
            countryCode: z.nativeEnum(ECountryCode),
            industry: z.nativeEnum(EIndustry),
            sourceLink: z.string(), // link to source of data - full link
            sourceName: z.string(), // eg full law name
            title: z.string(),
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

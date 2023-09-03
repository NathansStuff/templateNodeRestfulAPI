import { WithId } from 'mongodb';
import * as z from 'zod';

import {
    EComponentType,
    ECountryCode,
    EIndustry,
    EInfoType,
    EPromptTemplate,
} from '@/types/enums';

export const Info = z.object({
    // Saved into pinecone => Along with mongo id
    friendlyTitle: z.string(), // title, user facing
    sourceLink: z.string(), // link to source of data - full link
    aiText: z.string(), // text we send to openai
    tokens: z.number(), // tokens of the text to openai
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

    // Not saved into pinecone
    namespace: z.string(),
    savedInPinecone: z.boolean().default(false),
});

export type Info = z.infer<typeof Info>;
export type InfoWithId = WithId<Info>;

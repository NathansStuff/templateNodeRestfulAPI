import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { OPENAI_API_KEY } from '@/constants';

type Chunk = {
    pageContent: string;
    metadata: {
        loc: {
            lines: {
                from: number;
                to: number;
            };
        };
    };
};

export async function chunkData(text: string, chunkSize = 2000, chunkOverlap = 100): Promise<Chunk[]> {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize,
        chunkOverlap,
    });

    const output = await splitter.createDocuments([text]);

    return output as unknown as Chunk[];
}

export function createOpenaiEmbeddings(): OpenAIEmbeddings {
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: OPENAI_API_KEY,
        batchSize: 512, // Default value if omitted is 512. Max is 2048
    });

    return embeddings;
}

export async function embedOpenaiQuery(query: string): Promise<number[]> {
    const embeddings = createOpenaiEmbeddings();

    return await embeddings.embedQuery(query);
}

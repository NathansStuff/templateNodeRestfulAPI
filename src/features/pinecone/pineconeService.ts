/* eslint-disable @typescript-eslint/no-explicit-any */
import { chunkData, createOpenaiEmbeddings } from '@/features/langchain/langchainService';

import { getPineconeClient } from './pineconeConnect';

export async function upsetVector(indexName: string): Promise<any> {
    const data = await chunkData('hello world');
    const embeddings = createOpenaiEmbeddings();

    const pinecone = await getPineconeClient();

    const index = pinecone.Index(indexName);
    const queryRequest = {
        vector: [
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3,
            0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2,
            0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2,
            0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2,
            0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.2, 0.3, 0.4,
            0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4,
            0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4,
            0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4,
            0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3,
            0.4, 0.2, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.3, 0.2, 0.2, 0.3, 0.4, 0.2, 0.2, 0.2, 0.3, 0.2,
            0.2, 0.3, 0.4,
        ],
        topK: 10,
        includeValues: true,
        includeMetadata: true,
    };
    const queryResponse = await index.query({ queryRequest });
    const responseMetadata: any[] = [];

    queryResponse?.matches?.forEach((match) => {
        responseMetadata.push(match.metadata);
    });

    console.log(queryResponse.matches?.length);
    return queryResponse;
}

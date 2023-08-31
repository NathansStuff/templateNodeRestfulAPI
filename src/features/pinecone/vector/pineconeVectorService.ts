import { PINECONE_DEFAULT_INDEX_NAME } from '@/constants';
import { embedOpenaiQuery } from '@/features/langchain/langchainService';
import {
    FetchResponse,
    UpsertRequest,
    UpsertResponse,
} from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';

import { getPineconeClient } from '../pineconeConnect';

// note: cannot create vector
export async function upsertVector(upsertRequest: UpsertRequest): Promise<UpsertResponse> {
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);

    const upsertReponse = await index.upsert({ upsertRequest });

    return upsertReponse;
}

export async function embedAndUpsertVectors(vectors: any, namespace?: string): Promise<UpsertResponse> {
    const upsertRequests: any[] = [];
    await Promise.all(
        vectors.map(async (vector: any) => {
            const text = vector.text;
            const embed = await embedOpenaiQuery(text);

            const upsertRequest = {
                id: vector.id,
                values: embed,
                metadata: vector.metadata,
            };

            upsertRequests.push(upsertRequest);
        })
    );

    const upsertRequest = {
        vectors: upsertRequests,
        namespace,
    };

    const pinecone = await getPineconeClient();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);

    const upsertReponse = await index.upsert({ upsertRequest });

    return upsertReponse;
}

export async function deleteVectors(vectorIds: string[], namespace?: string): Promise<any> {
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);
    const deleteRequest = {
        ids: vectorIds,
        namespace,
    };

    const deleteResponse = await index.delete1(deleteRequest);

    return deleteResponse;
}

export async function getVectors(vectorIds: string[], namespace?: string): Promise<FetchResponse> {
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);
    const fetchRequest = {
        ids: vectorIds,
        namespace,
    };

    const fetchResponse = await index.fetch(fetchRequest);

    return fetchResponse;
}

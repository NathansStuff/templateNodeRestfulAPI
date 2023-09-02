import { PINECONE_DEFAULT_INDEX_NAME } from '@/constants';
import { embedOpenaiQuery } from '@/features/langchain/langchainService';
import { returnIndex } from '@/features/pinecone/index/pineconeIndexService';
import {
    FetchResponse,
    UpsertRequest,
    UpsertResponse,
} from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';

import { getPineconeClient } from '../pineconeConnect';

import { NamespaceType, VectorEmbedRequestType, VectorType } from './vectorType';

// note: cannot create vector
export async function upsertVector(upsertRequest: UpsertRequest): Promise<UpsertResponse> {
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);

    const upsertReponse = await index.upsert({ upsertRequest });

    return upsertReponse;
}

export async function embedAndUpsertVectors(
    vectors: VectorEmbedRequestType[],
    namespace: NamespaceType
): Promise<UpsertResponse> {
    const upsertRequests: VectorType[] = [];
    // Get embeddings for each vector
    await Promise.all(
        vectors.map(async (vector) => {
            const text = vector.metadata.text;
            const embed = await embedOpenaiQuery(text);
            const upsertRequest: VectorType = {
                id: vector.id,
                values: embed,
                metadata: vector.metadata,
            };
            upsertRequests.push(upsertRequest);
        })
    );

    const index = await returnIndex();
    const upsertRequest = {
        vectors: upsertRequests,
        namespace,
    };
    const upsertReponse = await index.upsert({ upsertRequest });

    return upsertReponse;
}

export async function deleteVectors(vectorIds: string[], namespace?: string): Promise<any> {
    const index = await returnIndex();
    const deleteRequest = {
        ids: vectorIds,
        namespace,
    };

    const deleteResponse = await index.delete1(deleteRequest);

    return deleteResponse;
}

export async function getVectors(vectorIds: string[], namespace?: string): Promise<FetchResponse> {
    const index = await returnIndex();
    const fetchRequest = {
        ids: vectorIds,
        namespace,
    };

    const fetchResponse = await index.fetch(fetchRequest);

    return fetchResponse;
}

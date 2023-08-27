import { getPineconeClient } from '../pineconeConnect';

import { mockVector } from './mockVector';

// note: cannot create vector
export async function upsertVector(indexName: string): Promise<any> {
    const hardcoded = 'test-index';
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(hardcoded);
    const upsertRequest = {
        vectors: [
            {
                id: 'vec1',
                values: mockVector,
            },
        ],
        namespace: 'example-namespace',
    };

    const upsertReponse = await index.upsert({ upsertRequest });

    return upsertReponse;
}

export async function deleteVector(indexName: string, vectorIds: string[]): Promise<any> {
    const pinecone = await getPineconeClient();
    const hardcoded = 'test-index';
    const index = pinecone.Index(hardcoded);
    const deleteRequest = {
        vectorIds: vectorIds,
        namespace: 'example-namespace',
    };

    const deleteResponse = await index.delete1(deleteRequest);

    return deleteResponse;
}

export async function getVectors(indexName: string, vectorIds: string[]): Promise<any> {
    const pinecone = await getPineconeClient();
    const hardcoded = 'test-index';
    const index = pinecone.Index(hardcoded);
    const fetchRequest = {
        ids: vectorIds,
        namespace: 'example-namespace',
    };

    const fetchResponse = await index.fetch(fetchRequest);

    return fetchResponse;
}

export async function updateVector(indexName: string, vectorId: string): Promise<any> {
    const pinecone = await getPineconeClient();
    const hardcoded = 'test-index';
    const index = pinecone.Index(hardcoded);
    const updateRequest = {
        id: vectorId,
        values: [0.1, 0.2, 0.3, 0.4],
        setMetadata: { genre: 'drama' },
        namespace: 'example-namespace',
    };
    const updateResponse = await index.update({ updateRequest });

    return updateResponse;
}

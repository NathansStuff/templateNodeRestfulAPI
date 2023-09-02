import { PINECONE_DEFAULT_INDEX_NAME, PINECONE_DEFAULT_NAMESPACE } from '@/constants';
import { VectorType } from '@/features/pinecone/vector/vectorType';
import { IndexMeta } from '@pinecone-database/pinecone';
import {
    DescribeIndexStatsResponse,
    ScoredVector,
    VectorOperationsApi,
} from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';

import { getPineconeClient } from '../pineconeConnect';

export async function getIndexes(): Promise<string[]> {
    const pinecone = await getPineconeClient();
    return await pinecone.listIndexes();
}

export async function createIndex(indexName: string, dimension: number): Promise<string> {
    const existingIndexes = await getIndexes();
    if (existingIndexes.includes(indexName)) {
        return `Index ${indexName} already exists`;
    }

    const pinecone = await getPineconeClient();
    await pinecone.createIndex({
        createRequest: {
            name: indexName,
            dimension,
        },
    });

    return `Index ${indexName} created`;
}

export async function getIndex(): Promise<{
    IndexMeta: IndexMeta;
    DescribeIndexStatsResponse: DescribeIndexStatsResponse;
}> {
    const pinecone = await getPineconeClient();

    const indexDescription = await describeIndex();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);
    const indexStats = await index.describeIndexStats({
        describeIndexStatsRequest: {
            filter: {},
        },
    });
    return {
        IndexMeta: indexDescription,
        DescribeIndexStatsResponse: indexStats,
    };
}

export async function returnIndex(): Promise<VectorOperationsApi> {
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);
    return index;
}

export async function deleteIndex(): Promise<string> {
    const pinecone = await getPineconeClient();
    return await pinecone.deleteIndex({
        indexName: PINECONE_DEFAULT_INDEX_NAME,
    });
}

export async function describeIndex(): Promise<IndexMeta> {
    const pinecone = await getPineconeClient();
    const response = await pinecone.describeIndex({
        indexName: PINECONE_DEFAULT_INDEX_NAME,
    });

    return response;
}

export async function queryIndex(vector: number[], namespace?: string): Promise<VectorType[]> {
    const pinecone = await getPineconeClient();
    const index = pinecone.Index(PINECONE_DEFAULT_INDEX_NAME);

    const queryRequest = {
        vector,
        topK: 10,
        includeValues: true,
        includeMetadata: true,
        filter: {
            // metadata
        },
        namespace: namespace || PINECONE_DEFAULT_NAMESPACE,
    };
    const queryResponse = await index.query({ queryRequest });

    const matches: ScoredVector[] | undefined = queryResponse.matches;

    if (matches === undefined) return [];

    // We transform from their generic return to our return which we know because we enforced it when creating the index
    return matches as unknown as VectorType[];
}

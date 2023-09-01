import { PINECONE_DEFAULT_INDEX_NAME, PINECONE_DEFAULT_NAMESPACE } from '@/constants';
import { IndexMeta } from '@pinecone-database/pinecone';
import {
    DescribeIndexStatsResponse,
    QueryResponse,
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

export async function queryIndex(vector: number[], namespace?: string): Promise<QueryResponse> {
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

    return queryResponse;
}

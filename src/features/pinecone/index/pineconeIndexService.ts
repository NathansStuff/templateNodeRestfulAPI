import { IndexMeta } from '@pinecone-database/pinecone';
import {
    DescribeIndexStatsResponse,
    QueryResponse,
} from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';

import { getPineconeClient } from '../pineconeConnect';
import { mockVector } from '../vector/mockVector';

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

export async function getIndex(
    indexName: string
): Promise<{ IndexMeta: IndexMeta; DescribeIndexStatsResponse: DescribeIndexStatsResponse }> {
    const hardCodedIndexName = 'test-index';
    console.log('indexName', indexName);
    const pinecone = await getPineconeClient();

    const indexDescription = await describeIndex(hardCodedIndexName);
    const index = pinecone.Index(hardCodedIndexName);
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

export async function deleteIndex(indexName: string): Promise<string> {
    const pinecone = await getPineconeClient();
    return await pinecone.deleteIndex({
        indexName,
    });
}

export async function describeIndex(indexName: string): Promise<IndexMeta> {
    const pinecone = await getPineconeClient();
    const response = await pinecone.describeIndex({
        indexName: indexName,
    });

    return response;
}

export async function queryIndex(indexName: string, vector: number[]): Promise<QueryResponse> {
    const pinecone = await getPineconeClient();
    const hardCodedIndexName = 'test-index';
    const index = pinecone.Index(hardCodedIndexName);
    //   queryRequest: {
    //     namespace: "example-namespace",
    //     topK: 10,
    //     filter: {
    //       genre: { $in: ["comedy", "documentary", "drama"] },
    //     },
    //     includeValues: true,
    //     includeMetadata: true,
    //     vector: [0.1, 0.2, 0.3, 0.4],
    //   },

    if (!vector || vector?.length === 0) {
        vector = mockVector;
    }

    const queryRequest = {
        vector,
        topK: 10,
        includeValues: true,
        includeMetadata: true,
        filter: {
            // genre: { $in: ['comedy', 'documentary', 'drama'] },
        },
    };
    const queryResponse = await index.query({ queryRequest });

    return queryResponse;
}

import { PineconeClient } from '@pinecone-database/pinecone';

import { PINECONE_API_KEY, PINECONE_ENV } from '@/constants';

let pineconeInstance: PineconeClient | null = null;

export async function getPineconeClient(): Promise<PineconeClient> {
    if (pineconeInstance !== null) {
        return pineconeInstance;
    }

    const client = new PineconeClient();
    await client.init({
        environment: PINECONE_ENV,
        apiKey: PINECONE_API_KEY,
    });

    pineconeInstance = client; // Cache the instance after successful initialization

    return pineconeInstance;
}

import { Request, Response } from 'express';

import { UpsertRequest } from '@pinecone-database/pinecone';

import { upsertVector } from './pineconeVectorService';

export async function upsertVectorHandler(req: Request, res: Response): Promise<void> {
    const indexes = await upsertVector(req.query.upsertRequest as unknown as UpsertRequest);
    res.status(200).json(indexes);
}

import { Request, Response } from 'express';

import { upsertVector } from './pineconeVectorService';

export async function upsertVectorHandler(req: Request, res: Response): Promise<void> {
    const indexes = await upsertVector(req.query.name as string);
    res.status(200).json(indexes);
}



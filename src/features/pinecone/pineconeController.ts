import { Request, Response } from 'express';

import { upsetVector } from './pineconeService';

export async function upsetVectorHandler(req: Request, res: Response): Promise<void> {
    const indexes = await upsetVector(req.params.indexName);
    res.status(200).json(indexes);
}

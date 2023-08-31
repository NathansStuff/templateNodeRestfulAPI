import { Request, Response } from 'express';

import { deleteVectors, embedAndUpsertVectors, getVectors, upsertVector } from './pineconeVectorService';

export async function upsertVectorHandler(req: Request, res: Response): Promise<void> {
    const indexes = await upsertVector(req.body);
    res.status(200).json({ vectorResponse: indexes, success: true });
}

export async function getVectorsHandler(req: Request, res: Response): Promise<void> {
    const indexes = await getVectors(req.body.ids, req.body.namespace);
    res.status(200).json({ vectorResponse: indexes, success: true });
}

export async function deleteVectorsHandler(req: Request, res: Response): Promise<void> {
    const indexes = await deleteVectors(req.body.ids, req.body.namespace);
    res.status(200).json({ vectorResponse: indexes, success: true });
}

export async function embedAndUpsertVectorsHandler(req: Request, res: Response): Promise<void> {
    const indexes = await embedAndUpsertVectors(req.body.vectors, req.body.namespace);
    res.status(200).json({ vectorResponse: indexes, success: true });
}

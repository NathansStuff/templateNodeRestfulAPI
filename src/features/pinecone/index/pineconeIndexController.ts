import { Request, Response } from 'express';

import { createIndex, deleteIndex, getIndex, getIndexes, queryIndex } from './pineconeIndexService';

export async function getIndexesHandler(req: Request, res: Response): Promise<void> {
    const indexes = await getIndexes();
    res.status(200).json(indexes);
}

export async function getIndexHandler(req: Request, res: Response): Promise<void> {
    const indexes = await getIndex(req.params.indexName);
    res.status(200).json(indexes);
}

export async function deleteIndexHandler(req: Request, res: Response): Promise<void> {
    const indexes = await deleteIndex(req.params.indexName);
    res.status(200).json(indexes);
}

export async function createIndexHandler(req: Request, res: Response): Promise<void> {
    const { indexName, dimension } = req.body;
    const indexes = await createIndex(indexName, dimension);
    res.status(200).json(indexes);
}

export async function queryIndexHandler(req: Request, res: Response): Promise<void> {
    const { indexName, vector } = req.body;
    const indexes = await queryIndex(indexName, vector);
    res.status(200).json(indexes);
}

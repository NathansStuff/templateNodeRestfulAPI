import { UpsertResponse } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';
import { Request, Response } from 'express';

import {
    deleteVectors,
    embedAndUpsertVectors,
    getVectors,
    upsertVector,
} from './vectorService';
import { EmbedAndUpsertVectorsRequestType } from './vectorType';

export async function upsertVectorHandler(
    req: Request,
    res: Response
): Promise<void> {
    const indexes = await upsertVector(req.body);
    res.status(200).json({ vectorResponse: indexes, success: true });
}

export async function getVectorsHandler(
    req: Request,
    res: Response
): Promise<void> {
    const indexes = await getVectors(req.body.ids, req.body.namespace);
    res.status(200).json({ vectorResponse: indexes, success: true });
}

export async function deleteVectorsHandler(
    req: Request,
    res: Response
): Promise<void> {
    const indexes = await deleteVectors(req.body.ids, req.body.namespace);
    res.status(200).json({ vectorResponse: indexes, success: true });
}

export async function embedAndUpsertVectorsHandler(
    req: Request<object, UpsertResponse, EmbedAndUpsertVectorsRequestType>,
    res: Response<UpsertResponse>
): Promise<void> {
    const safeBody = EmbedAndUpsertVectorsRequestType.parse(req.body);
    const { vectors, namespace } = safeBody;
    const indexes = await embedAndUpsertVectors(vectors, namespace);
    res.status(200).json(indexes);
}

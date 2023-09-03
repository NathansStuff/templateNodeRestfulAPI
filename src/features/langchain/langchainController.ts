import { Request, Response } from 'express';

import { chunkData, embedOpenaiQuery } from './langchainService';

export async function langchainChunkDataHandler(
    req: Request,
    res: Response
): Promise<void> {
    const chunks = await chunkData(req.body.text);
    res.status(200).json(chunks);
}

export async function langchainEmbedOpenaiQueryHandler(
    req: Request,
    res: Response
): Promise<void> {
    const chunks = await embedOpenaiQuery(req.body.text);
    res.status(200).json(chunks);
}

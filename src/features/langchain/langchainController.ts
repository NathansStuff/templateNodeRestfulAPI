import { Request, Response } from 'express';

import { chunkData } from './langchainService';

export async function langchainChunkDataHandler(req: Request, res: Response): Promise<void> {
    const chunks = await chunkData(req.body.text);
    res.status(200).json(chunks);
}

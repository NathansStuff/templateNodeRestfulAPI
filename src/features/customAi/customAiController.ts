import { Request, Response } from 'express';

import { findInfoForQuery } from './customAiService';

export async function findInfoForQueryHandler(req: Request, res: Response): Promise<void> {
    const chunks = await findInfoForQuery(req.body.question, req.body.namespace);
    res.status(200).json(chunks);
}

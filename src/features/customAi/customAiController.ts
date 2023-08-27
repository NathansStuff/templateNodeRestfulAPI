import { Request, Response } from 'express';

import { queryAi } from './customAiService';

export async function customAiQueryHandler(req: Request, res: Response): Promise<void> {
    const chunks = await queryAi(req.body.question);
    res.status(200).json(chunks);
}

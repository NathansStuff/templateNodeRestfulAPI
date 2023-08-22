import { Request, Response } from 'express';

import { getQuote } from './quoteService';

export async function getQuoteController(req: Request, res: Response): Promise<void> {
    const quoteResult = await getQuote(req.body);
    res.status(200).json(quoteResult);
}

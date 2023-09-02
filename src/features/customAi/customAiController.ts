import { Request, Response } from 'express';
import * as z from 'zod';

import { buildQueryTemplate, findInfoForQuery } from './customAiService';

export async function findInfoForQueryHandler(
    req: Request<object, string[], { question: string; namespace?: string }>,
    res: Response<string[]>
): Promise<void> {
    const safeQuestion = z.string().nonempty().parse(req.body.question);
    const safeNamespace = z.string().optional().parse(req.body.namespace);

    const chunks = await findInfoForQuery(safeQuestion, safeNamespace);
    res.status(200).json(chunks);
}

export async function buildQueryTemplateHandler(
    req: Request<object, string, { question: string; matchedText: string[] }>,
    res: Response<string>
): Promise<void> {
    const safeQuestion = z.string().nonempty().parse(req.body.question);
    const safeMatchedText = z.array(z.string()).nonempty().parse(req.body.matchedText);

    const query = buildQueryTemplate(safeQuestion, safeMatchedText);
    res.status(200).json(query);
}

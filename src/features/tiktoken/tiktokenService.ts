import tiktoken from 'tiktoken-node';

import { EModel } from '@/features/openAi/types/EModel';

export function getTokenCount(text: string, model: EModel): number {
    const enc = tiktoken.encodingForModel(model);
    const encoding = enc.encode(text);
    return encoding.length;
}

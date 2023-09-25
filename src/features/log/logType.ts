import { WithId } from 'mongodb';
import * as z from 'zod';

export const Log = z.object({
    authorisation: z.string().optional(),
    requestBody: z.string().optional(),
    responseBody: z.string().optional(),
    responseStatus: z.number().optional(),
    auditTimer: z.number().optional(),
    endpoint: z.string().optional(),
    ipAddress: z.string().optional(),
    partnerId: z.string().optional(),
});

export type Log = z.infer<typeof Log>;
export type LogWithId = WithId<Log>;

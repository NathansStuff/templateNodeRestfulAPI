import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    langchainChunkDataHandler,
    langchainEmbedOpenaiQueryHandler,
} from './langchainController';

const langchainRouter = express.Router();

langchainRouter.post('/chunk', TryCatchMiddleware(langchainChunkDataHandler));
langchainRouter.post(
    '/embed',
    TryCatchMiddleware(langchainEmbedOpenaiQueryHandler)
);

export { langchainRouter };

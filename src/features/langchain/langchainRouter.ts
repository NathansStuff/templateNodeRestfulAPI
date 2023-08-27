import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import { langchainChunkDataHandler } from './langchainController';

const langchainRouter = express.Router();

langchainRouter.post('/chunk', TryCatchMiddleware(langchainChunkDataHandler));

export { langchainRouter };

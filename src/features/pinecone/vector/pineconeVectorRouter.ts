import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import { upsertVectorHandler } from './pineconeVectorController';

const PineconeVectorRouter = express.Router();

PineconeVectorRouter.put('/:indexName', TryCatchMiddleware(upsertVectorHandler));

export default PineconeVectorRouter;

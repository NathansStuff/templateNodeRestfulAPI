import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    deleteVectorsHandler,
    embedAndUpsertVectorsHandler,
    getVectorsHandler,
    upsertVectorHandler,
} from './pineconeVectorController';

const PineconeVectorRouter = express.Router();

PineconeVectorRouter.put('/', TryCatchMiddleware(upsertVectorHandler));
PineconeVectorRouter.post('/', TryCatchMiddleware(embedAndUpsertVectorsHandler));
PineconeVectorRouter.post('/ids', TryCatchMiddleware(getVectorsHandler));
PineconeVectorRouter.post('/delete-ids', TryCatchMiddleware(deleteVectorsHandler));

export default PineconeVectorRouter;

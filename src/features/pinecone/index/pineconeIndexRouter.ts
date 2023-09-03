import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createIndexHandler,
    deleteIndexHandler,
    getIndexesHandler,
    getIndexHandler,
    queryIndexHandler,
} from './pineconeIndexController';

const PineconeIndexRouter = express.Router();

PineconeIndexRouter.get('/', TryCatchMiddleware(getIndexesHandler));
PineconeIndexRouter.get('/:indexName', TryCatchMiddleware(getIndexHandler));
PineconeIndexRouter.post('/:indexName', TryCatchMiddleware(queryIndexHandler));
PineconeIndexRouter.delete(
    '/:indexName',
    TryCatchMiddleware(deleteIndexHandler)
);
PineconeIndexRouter.post('/', TryCatchMiddleware(createIndexHandler));

export default PineconeIndexRouter;

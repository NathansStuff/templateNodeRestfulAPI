import express from 'express';

import PineconeIndexRouter from './index/pineconeIndexRouter';
import PineconeVectorRouter from './vector/vectorRouter';

const pineconeRouter = express.Router();

pineconeRouter.use('/index', PineconeIndexRouter);
pineconeRouter.use('/vector', PineconeVectorRouter);

export default pineconeRouter;

import express from 'express';

import { CustomAiRouter } from '@/features/customAi/customAiRouter';
import { langchainRouter } from '@/features/langchain/langchainRouter';
import pineconeRouter from '@/features/pinecone/pineconeRouter';

const apiRouter = express.Router();

apiRouter.use('/langchain', langchainRouter);
apiRouter.use('/pinecone', pineconeRouter);
apiRouter.use('/customAi', CustomAiRouter);

export { apiRouter };

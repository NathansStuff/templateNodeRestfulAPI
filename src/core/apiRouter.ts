import express from 'express';

import { CustomAiRouter } from '@/features/customAi/customAiRouter';
import { DocumentRouter } from '@/features/document/documentRouter';
import { InfoRouter } from '@/features/info/infoRouter';
import { langchainRouter } from '@/features/langchain/langchainRouter';
import pineconeRouter from '@/features/pinecone/pineconeRouter';

const apiRouter = express.Router();

apiRouter.use('/langchain', langchainRouter);
apiRouter.use('/pinecone', pineconeRouter);
apiRouter.use('/customAi', CustomAiRouter);
apiRouter.use('/info', InfoRouter);
apiRouter.use('/document', DocumentRouter);

export { apiRouter };

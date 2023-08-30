import express from 'express';

import { criteriaGroupRouter } from '@/features/criteriaGroup/criteriaGroupRouter';
import { CustomAiRouter } from '@/features/customAi/customAiRouter';
import { langchainRouter } from '@/features/langchain/langchainRouter';
import { lenderRouter } from '@/features/lender/lenderRouter';
import pineconeRouter from '@/features/pinecone/pineconeRouter';
import { ProductRouter } from '@/features/product/productRouter';
import { quoteRouter } from '@/features/quote/quoteRouter';
import { RatePolicyRouter } from '@/features/ratePolicy/ratePolicyRouter';
import { SubmissionRequirementsRouter } from '@/features/submissionRequirements/submissionRequirementsRoutes';
import { TodoRouter } from '@/features/todo/todoRouter';
import { userRouter } from '@/features/user/userRouter';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/criteriaGroup', criteriaGroupRouter);
apiRouter.use('/lender', lenderRouter);
apiRouter.use('/quote', quoteRouter);
apiRouter.use('/product', ProductRouter);
apiRouter.use('/ratePolicy', RatePolicyRouter);
apiRouter.use('/submissionRequirements', SubmissionRequirementsRouter);
apiRouter.use('/langchain', langchainRouter);
apiRouter.use('/pinecone', pineconeRouter);
apiRouter.use('/customAi', CustomAiRouter);
apiRouter.use('/todo', TodoRouter);

export { apiRouter };

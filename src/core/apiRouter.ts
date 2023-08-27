import express from 'express';

import { criteriaGroupRouter } from '@/features/criteriaGroup/criteriaGroupRouter';
import { lenderRouter } from '@/features/lender/lenderRouter';
import { ProductRouter } from '@/features/product/productRouter';
import { quoteRouter } from '@/features/quote/quoteRouter';
import { RatePolicyRouter } from '@/features/ratePolicy/ratePolicyRouter';
import { SubmissionRequirementsRouter } from '@/features/submissionRequirements/submissionRequirementsRoutes';
import { userRouter } from '@/features/user/userRouter';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/criteriaGroup', criteriaGroupRouter);
apiRouter.use('/lender', lenderRouter);
apiRouter.use('/quote', quoteRouter);
apiRouter.use('/product', ProductRouter);
apiRouter.use('/ratePolicy', RatePolicyRouter);
apiRouter.use('/submissionRequirements', SubmissionRequirementsRouter);

export { apiRouter };


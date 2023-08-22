import express from 'express';

import { criteriaGroupRouter } from '@/features/criteriaGroup/criteriaGroupRouter';
import { lenderRouter } from '@/features/lender/lenderRouter';
import { quoteRouter } from '@/features/quote/quoteRouter';
import { userRouter } from '@/features/user/userRouter';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/criteriaGroup', criteriaGroupRouter);
apiRouter.use('/lender', lenderRouter);
apiRouter.use('/quote', quoteRouter);

export { apiRouter };

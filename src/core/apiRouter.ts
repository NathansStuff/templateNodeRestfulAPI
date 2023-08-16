import express from 'express';

import { userRouter } from '@/features/user/userRouter';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);

export { apiRouter };

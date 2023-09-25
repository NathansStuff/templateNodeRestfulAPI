import express from 'express';

import { partnerRouter } from '@/features/partner/partnerRouter';

const apiRouter = express.Router();

apiRouter.use('/partner', partnerRouter);

export { apiRouter };

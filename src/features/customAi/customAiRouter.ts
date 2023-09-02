import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import { findInfoForQueryHandler } from './customAiController';

const CustomAiRouter = express.Router();

CustomAiRouter.post('/findInfo', TryCatchMiddleware(findInfoForQueryHandler));

export { CustomAiRouter };

import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import { buildQueryTemplateHandler, findInfoForQueryHandler } from './customAiController';

const CustomAiRouter = express.Router();

CustomAiRouter.post('/findInfo', TryCatchMiddleware(findInfoForQueryHandler));
CustomAiRouter.post('/buildQuery', TryCatchMiddleware(buildQueryTemplateHandler));

export { CustomAiRouter };

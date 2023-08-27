import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import { customAiQueryHandler } from './customAiController';

const CustomAiRouter = express.Router();

CustomAiRouter.post('/query', TryCatchMiddleware(customAiQueryHandler));

export { CustomAiRouter };

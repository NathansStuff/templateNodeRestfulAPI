import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import { getQuoteController } from './quoteController';

const quoteRouter = express.Router();

// Define API routes here
quoteRouter.post('/', TryCatchMiddleware(getQuoteController));

export { quoteRouter };

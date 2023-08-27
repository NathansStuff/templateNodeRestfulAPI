import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createRatePolicyHandler,
    deleteRatePolicyHandler,
    getAllRatePolicysHandler,
    getRatePolicyByIdHandler,
    updateRatePolicyHandler,
} from './ratePolicyController';

const RatePolicyRouter = express.Router();

// Define API routes here
RatePolicyRouter.get('/', TryCatchMiddleware(getAllRatePolicysHandler));
RatePolicyRouter.get('/:id', TryCatchMiddleware(getRatePolicyByIdHandler));
RatePolicyRouter.post('/', TryCatchMiddleware(createRatePolicyHandler));
RatePolicyRouter.put('/:id', TryCatchMiddleware(updateRatePolicyHandler));
RatePolicyRouter.delete('/:id', TryCatchMiddleware(deleteRatePolicyHandler));

export { RatePolicyRouter };

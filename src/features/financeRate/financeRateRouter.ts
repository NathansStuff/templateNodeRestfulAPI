import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createFinanceRateHandler,
    deleteFinanceRateHandler,
    getAllFinanceRatesHandler,
    getFinanceRateByIdHandler,
    updateFinanceRateHandler,
} from './financeRateController';

const FinanceRateRouter = express.Router();

// Define API routes here
FinanceRateRouter.get('/', TryCatchMiddleware(getAllFinanceRatesHandler));
FinanceRateRouter.get('/:id', TryCatchMiddleware(getFinanceRateByIdHandler));
FinanceRateRouter.post('/', TryCatchMiddleware(createFinanceRateHandler));
FinanceRateRouter.put('/:id', TryCatchMiddleware(updateFinanceRateHandler));
FinanceRateRouter.delete('/:id', TryCatchMiddleware(deleteFinanceRateHandler));

export { FinanceRateRouter };

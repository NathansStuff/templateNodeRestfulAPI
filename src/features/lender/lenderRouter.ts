import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createLenderHandler,
    deleteLenderHandler,
    getAllLendersHandler,
    getLenderByCodeHandler,
    getLenderByIdHandler,
    getLendersByNameHandler,
    updateLenderHandler,
} from './lenderController';

const lenderRouter = express.Router();

// Define API routes here
lenderRouter.get('/lenderCode/:code', TryCatchMiddleware(getLenderByCodeHandler));
lenderRouter.get('/lenderName/:name', TryCatchMiddleware(getLendersByNameHandler));

lenderRouter.get('/', TryCatchMiddleware(getAllLendersHandler));
lenderRouter.get('/:id', TryCatchMiddleware(getLenderByIdHandler));
lenderRouter.post('/', TryCatchMiddleware(createLenderHandler));
lenderRouter.put('/:id', TryCatchMiddleware(updateLenderHandler));
lenderRouter.delete('/:id', TryCatchMiddleware(deleteLenderHandler));

export { lenderRouter };

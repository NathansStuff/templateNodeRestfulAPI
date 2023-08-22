import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createCriteriaGroupHandler,
    deleteCriteriaGroupHandler,
    getAllCriteriaGroupsHandler,
    getCriteriaGroupByIdHandler,
    updateCriteriaGroupHandler,
} from './criteriaGroupController';

const criteriaGroupRouter = express.Router();

// Define API routes here
criteriaGroupRouter.get('/', TryCatchMiddleware(getAllCriteriaGroupsHandler));
criteriaGroupRouter.get('/:id', TryCatchMiddleware(getCriteriaGroupByIdHandler));
criteriaGroupRouter.post('/', TryCatchMiddleware(createCriteriaGroupHandler));
criteriaGroupRouter.put('/:id', TryCatchMiddleware(updateCriteriaGroupHandler));
criteriaGroupRouter.delete('/:id', TryCatchMiddleware(deleteCriteriaGroupHandler));

export { criteriaGroupRouter };

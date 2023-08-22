import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createSubmissionRequirementsHandler,
    deleteSubmissionRequirementsHandler,
    getAllSubmissionRequirementssHandler,
    getSubmissionRequirementsByIdHandler,
    updateSubmissionRequirementsHandler,
} from './submissionRequirementsController';

const SubmissionRequirementsRouter = express.Router();

// Define API routes here
SubmissionRequirementsRouter.get('/', TryCatchMiddleware(getAllSubmissionRequirementssHandler));
SubmissionRequirementsRouter.get('/:id', TryCatchMiddleware(getSubmissionRequirementsByIdHandler));
SubmissionRequirementsRouter.post('/', TryCatchMiddleware(createSubmissionRequirementsHandler));
SubmissionRequirementsRouter.put('/:id', TryCatchMiddleware(updateSubmissionRequirementsHandler));
SubmissionRequirementsRouter.delete('/:id', TryCatchMiddleware(deleteSubmissionRequirementsHandler));

export { SubmissionRequirementsRouter };

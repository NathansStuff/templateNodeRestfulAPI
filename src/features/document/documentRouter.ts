import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createDocumentHandler,
    deleteDocumentHandler,
    getAllDocumentsHandler,
    getDocumentByIdHandler,
    updateDocumentHandler,
} from './documentController';

const DocumentRouter = express.Router();

DocumentRouter.route('/')
    .get(TryCatchMiddleware(getAllDocumentsHandler))
    .post(TryCatchMiddleware(createDocumentHandler));
DocumentRouter.route('/:id')
    .get(TryCatchMiddleware(getDocumentByIdHandler))
    .put(TryCatchMiddleware(updateDocumentHandler))
    .delete(TryCatchMiddleware(deleteDocumentHandler));

export { DocumentRouter };

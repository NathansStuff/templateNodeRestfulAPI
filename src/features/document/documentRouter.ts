import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createDocumentHandler,
    deleteDocumentHandler,
    getAllDocumentsHandler,
    getDocumentByIdHandler,
    getInfosByDocumentIdHandler,
    updateDocumentHandler,
} from './documentController';

const DocumentRouter = express.Router();

DocumentRouter.route('/')
    .get(TryCatchMiddleware(getAllDocumentsHandler))
    .post(TryCatchMiddleware(createDocumentHandler));
DocumentRouter.route('/withInfo/:id').get(
    TryCatchMiddleware(getInfosByDocumentIdHandler)
);
DocumentRouter.route('/:id')
    .get(TryCatchMiddleware(getDocumentByIdHandler))
    .put(TryCatchMiddleware(updateDocumentHandler))
    .delete(TryCatchMiddleware(deleteDocumentHandler));

export { DocumentRouter };

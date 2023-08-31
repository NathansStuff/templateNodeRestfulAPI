import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createInfoHandler,
    deleteInfoHandler,
    getAllInfosHandler,
    getInfoByIdHandler,
    updateInfoHandler,
} from './infoController';

const InfoRouter = express.Router();

InfoRouter.route('/').get(TryCatchMiddleware(getAllInfosHandler)).post(TryCatchMiddleware(createInfoHandler));
InfoRouter.route('/:id')
    .get(TryCatchMiddleware(getInfoByIdHandler))
    .put(TryCatchMiddleware(updateInfoHandler))
    .delete(TryCatchMiddleware(deleteInfoHandler));

export { InfoRouter };

import express from 'express';

import { protectedAccessMiddleware } from '@/middleware/protectedAccessMiddleware';
import { EActionAccess } from '@/types/EActionAccess';

import {
    createPartnerHandler,
    deletePartnerByIdHandler,
    getAllPartnersHandler,
    getPartnerByIdHandler,
    updatePartnerHandler,
} from './partnerController';

const partnerRouter = express.Router();

const partnerAction = EActionAccess.PARTNER;

partnerRouter
    .route('/')
    .get(protectedAccessMiddleware(partnerAction, getAllPartnersHandler))
    .post(protectedAccessMiddleware(partnerAction, createPartnerHandler));

partnerRouter
    .route('/:id')
    .get(protectedAccessMiddleware(partnerAction, getPartnerByIdHandler))
    .put(protectedAccessMiddleware(partnerAction, updatePartnerHandler))
    .delete(protectedAccessMiddleware(partnerAction, deletePartnerByIdHandler));

export { partnerRouter };

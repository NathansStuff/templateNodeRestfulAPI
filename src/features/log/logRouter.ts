import express from 'express';

import { protectedAccessMiddleware } from '@/middleware/protectedAccessMiddleware';
import { EActionAccess } from '@/types/EActionAccess';

import { getAllLogsHandler } from './logController';

const logRouter = express.Router();

const logAction = EActionAccess.LOGS;

logRouter.route('/').get(protectedAccessMiddleware(logAction, getAllLogsHandler));

// Deliberately not implementing the other CRUD operations for logs

export { logRouter };

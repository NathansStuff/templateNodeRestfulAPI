import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import { getHelloWorldHandler } from './userController';

const userRouter = express.Router();

// Define API routes here
userRouter.get('/', TryCatchMiddleware(getHelloWorldHandler));

export { userRouter };

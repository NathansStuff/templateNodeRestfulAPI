import express, { Express } from 'express';

import { logMiddleware } from '@/middleware/logMiddleware';

import { commonRouter } from './commonRouter';

const app: Express = express();
app.use(express.json());
app.use(logMiddleware);

app.use(commonRouter);

export default app;

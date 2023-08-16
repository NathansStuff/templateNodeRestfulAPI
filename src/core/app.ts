import express, { Express } from 'express';

import { commonRouter } from './commonRouter';

const app: Express = express();
app.use(express.json());

app.use(commonRouter);

export default app;

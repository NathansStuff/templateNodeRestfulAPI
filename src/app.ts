import express from 'express';

import { connectDB } from './database/db';
import { ErrorHandler } from './middleware/Errors/ErrorHandler';
import apiRoutes from './routes/apiRoutes';
import { TryCatchMiddleware } from './middleware/TryCatchMiddleware';

export const db = async (): Promise<void> => {
  await connectDB();
};

void db();

const app = express();
app.use(express.json());

app.use('/api', TryCatchMiddleware(apiRoutes));

app.use(ErrorHandler);

export default app;

import express from 'express';
import * as Colors from 'colors.ts';

import { connectDB } from './database/db';
import { PORT } from './utils/config';
import { ErrorHandler } from './middleware/Errors/ErrorHandler';
import apiRoutes from './routes/apiRoutes';
import { TryCatchMiddleware } from './middleware/TryCatchMiddleware';

Colors.colors('', '');

export const db = async (): Promise<void> => {
    await connectDB();
};

void db();

const app = express();
app.use(express.json());

app.use('/api', TryCatchMiddleware(apiRoutes));

app.use(ErrorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

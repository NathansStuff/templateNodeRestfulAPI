import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config(); // required to be at the top of the file
import { PORT } from '@/constants';
import * as Colors from 'colors.ts';
Colors.enable();

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`.blue);
});

export default app;

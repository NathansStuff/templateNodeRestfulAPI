import '@/config';

import { PORT } from '@/constants';

import app from './app';

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`.blue);
});

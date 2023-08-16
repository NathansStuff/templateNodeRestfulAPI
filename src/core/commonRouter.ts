import express from 'express';

import { apiRouter } from './apiRouter';

const commonRouter = express.Router();

commonRouter.use('/api', apiRouter);

// Test endpoints for unit testing
if (process.env.NODE_ENV === 'test') {
    commonRouter.post('/test-endpoint', (req, res) => {
        res.status(200).json(req.body); // Send the request body back as the response;
    });
}

// Middleware for handling not found routes
commonRouter.use((req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
});

export { commonRouter };

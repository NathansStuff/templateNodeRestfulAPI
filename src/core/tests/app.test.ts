// app.test.ts
import request from 'supertest';

import app from '../app'; // Import the factory function

describe('Express app', () => {
    it('should parse JSON body', async () => {
        // Make a request to the test endpoint and verify that JSON is parsed correctly
        await request(app).post('/test-endpoint').send({ key: 'value' }).expect(200, { key: 'value' });
    });
});

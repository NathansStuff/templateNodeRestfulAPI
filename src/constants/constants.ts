import assert from 'assert';

assert.ok(process.env.PORT, 'PORT is not defined in .env file');
export const PORT = process.env.PORT;

assert.ok(process.env.MONGO_URI, 'MONGO_URI is not defined in .env file');
export const MONGO_URI = process.env.MONGO_URI;

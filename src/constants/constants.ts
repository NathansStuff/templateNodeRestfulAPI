import assert from 'assert';

// ***** General *****
assert.ok(process.env.PORT, 'PORT is not defined in .env file');
export const PORT = process.env.PORT;

assert.ok(process.env.NODE_ENV, 'NODE_ENV is not defined in .env file');
export const NODE_ENV = process.env.NODE_ENV;

// ***** Database *****
assert.ok(process.env.MONGO_URI, 'MONGO_URI is not defined in .env file');
export const MONGO_URI = process.env.MONGO_URI;

import assert from 'assert';

assert.ok(process.env.PORT, 'PORT is not defined in .env file');
export const PORT = process.env.PORT;

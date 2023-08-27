import assert from 'assert';

// ***** General *****
assert.ok(process.env.PORT, 'PORT is not defined in .env file');
export const PORT = process.env.PORT;

assert.ok(process.env.NODE_ENV, 'NODE_ENV is not defined in .env file');
export const NODE_ENV = process.env.NODE_ENV;

// ***** Database *****
assert.ok(process.env.MONGO_URI, 'MONGO_URI is not defined in .env file');
export const MONGO_URI = process.env.MONGO_URI;

// ***** OpenAI *****
assert.ok(process.env.OPENAI_API_KEY, 'OPENAI_API_KEY is not defined in .env file');
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ***** Pinecone *****
assert.ok(process.env.PINECONE_API_KEY, 'PINECONE_API_KEY is not defined in .env file');
export const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

assert.ok(process.env.PINECONE_ENV, 'PINECONE_ENV is not defined in .env file');
export const PINECONE_ENV = process.env.PINECONE_ENV;

assert.ok(process.env.PINECONE_DEFAULT_INDEX_NAME, 'PINECONE_DEFAULT_INDEX_NAME is not defined in .env file');
export const PINECONE_DEFAULT_INDEX_NAME = process.env.PINECONE_DEFAULT_INDEX_NAME;

import express from 'express';

import verifyExternalIQService from '../../middleware/verifyExternalIQService';

import {
    getGptChatCompletionRequestHandler,
    getGptTextCompletionRequestHandler,
} from './gpt3Controller';

const gpt3Routes = express.Router();

gpt3Routes.post(
    '/textcompletion',
    verifyExternalIQService,
    getGptTextCompletionRequestHandler
);

gpt3Routes.post(
    '/chatcompletion',
    verifyExternalIQService,
    getGptChatCompletionRequestHandler
);

export default gpt3Routes;

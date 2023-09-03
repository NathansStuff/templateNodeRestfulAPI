import express from 'express';
import {
  getGptChatCompletionRequestHandler,
  getGptTextCompletionRequestHandler,
} from './gpt3Controller';
import verifyExternalIQService from '../../middleware/verifyExternalIQService';

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

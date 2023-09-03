import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getGpt3ChatCompletionRequest,
  getGpt3CompletionRequest,
} from './gpt3Service';
import { sanitizeGptTextCompletionRequest } from './sanitizers/sanitizeGptTextCompletionRequest/sanitizeGptTextCompletionRequest';
import { sanitizeGptChatCompletionRequest } from './sanitizers/sanitizeGptChatCompletionRequest/sanitizeGptChatCompletionRequest';

// @desc Get a GPT-3 completion
// @route POST /api/gpt3/completion
// @access Private
export const getGptTextCompletionRequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const sanitizedRequest = sanitizeGptTextCompletionRequest(req.body);
    const response = await getGpt3CompletionRequest(sanitizedRequest);

    res.status(200).json(response);
  }
);

// @desc Get a GPT-3 chat completion
// @route POST /api/gpt3/chat-completion
// @access Private
export const getGptChatCompletionRequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const sanitizedRequest = sanitizeGptChatCompletionRequest(req.body);
    const response = await getGpt3ChatCompletionRequest(sanitizedRequest);

    res.status(200).json(response);
  }
);

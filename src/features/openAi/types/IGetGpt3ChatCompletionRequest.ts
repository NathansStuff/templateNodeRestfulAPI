import { EChatCompletions } from './EChatCompletions';
import { IChatCompletionMessages } from './IChatCompletionMessages';

export interface IGetGpt3ChatCompletionRequest {
  model?: EChatCompletions;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  messages: IChatCompletionMessages[];
}

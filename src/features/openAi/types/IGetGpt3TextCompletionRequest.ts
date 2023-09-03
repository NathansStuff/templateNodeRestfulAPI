import { ETextCompletions } from './ETextCompletions';

export interface IGetGpt3TextCompletionRequest {
  prompt: string;
  model?: ETextCompletions;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

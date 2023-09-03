import { Configuration, OpenAIApi } from 'openai';

import { NODE_ENV, OPENAI_API_KEY } from '@/constants';

import { IGetGpt3ChatCompletionRequest } from './types/IGetGpt3ChatCompletionRequest';
import { IGetGpt3TextCompletionRequest } from './types/IGetGpt3TextCompletionRequest';
import {
    DEFAULT_CHAT_COMPLETION_MODEL,
    DEFAULT_COMPLETION_MODEL,
    DEFAULT_FREQUENCY_PENALTY,
    DEFAULT_MAX_TOKENS,
    DEFAULT_PRESENCE_PENALTY,
    DEFAULT_TEMPERATURE,
    DEFAULT_TOP_P,
} from './gpt3Constants';

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getGpt3CompletionRequest({
    prompt,
    model,
    temperature,
    maxTokens,
    topP,
    frequencyPenalty,
    presencePenalty,
}: IGetGpt3TextCompletionRequest): Promise<string> {
    if (NODE_ENV === 'development') {
        return 'Successful request to development';
    }

    const result = await openai.createCompletion({
        model: (model ?? DEFAULT_COMPLETION_MODEL) as unknown as string,
        prompt,
        temperature: temperature ?? DEFAULT_TEMPERATURE,
        max_tokens: maxTokens ?? DEFAULT_MAX_TOKENS,
        top_p: topP ?? DEFAULT_TOP_P,
        frequency_penalty: frequencyPenalty ?? DEFAULT_FREQUENCY_PENALTY,
        presence_penalty: presencePenalty ?? DEFAULT_PRESENCE_PENALTY,
    });

    if (result.data.choices.length === 0) {
        return 'No response';
    }

    // For now, we'll just take the first choice
    const firstChoice = result.data.choices[0];

    return firstChoice.text?.trim() ?? 'No response';
}

export async function getGpt3ChatCompletionRequest({
    model,
    messages,
    temperature,
    maxTokens,
    topP,
    frequencyPenalty,
    presencePenalty,
}: IGetGpt3ChatCompletionRequest): Promise<string> {
    if (NODE_ENV === 'development') {
        return 'Successful request to development';
    }

    const result = await openai.createChatCompletion({
        model: (model ?? DEFAULT_CHAT_COMPLETION_MODEL) as unknown as string,
        temperature: temperature ?? DEFAULT_TEMPERATURE,
        max_tokens: maxTokens ?? DEFAULT_MAX_TOKENS,
        top_p: topP ?? DEFAULT_TOP_P,
        frequency_penalty: frequencyPenalty ?? DEFAULT_FREQUENCY_PENALTY,
        presence_penalty: presencePenalty ?? DEFAULT_PRESENCE_PENALTY,
        messages,
    });

    const choices = result.data.choices;

    if (choices.length === 0) {
        return 'No response';
    }

    // For now, we'll just take the first choice
    const firstChoice = choices[0];

    return firstChoice.message?.content?.trim() ?? 'No response';
}

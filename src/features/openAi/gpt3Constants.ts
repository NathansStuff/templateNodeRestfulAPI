import { EChatCompletions } from './types/EChatCompletions';
import { EGpt3ModelTypes } from './types/EModel';
import { ETextCompletions } from './types/ETextCompletions';

export const DEFAULT_MODEL = EGpt3ModelTypes.CURIE;
export const DEFAULT_COMPLETION_MODEL = ETextCompletions.TEXTCURIE001;
export const DEFAULT_CHAT_COMPLETION_MODEL = EChatCompletions.GPT35TURBO;

export const DEFAULT_TEMPERATURE = 0.8;

export const DEFAULT_MAX_TOKENS = 70;

export const DEFAULT_TOP_P = 1.0;

export const DEFAULT_FREQUENCY_PENALTY = 0.0;

export const DEFAULT_PRESENCE_PENALTY = 0.0;

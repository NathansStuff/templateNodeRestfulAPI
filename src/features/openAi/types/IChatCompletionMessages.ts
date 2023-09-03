import { ERole } from './ERole';

export interface IChatCompletionMessages {
    role: ERole;
    content: string;
}

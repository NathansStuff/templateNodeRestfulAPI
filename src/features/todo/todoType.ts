import { WithId } from 'mongodb';
import * as z from 'zod';

export enum TodoStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
}

export const Todo = z.object({
    content: z.string().min(1),
    done: z.boolean().default(false),
    status: z.nativeEnum(TodoStatus),
});

export type Todo = z.infer<typeof Todo>;
export type TodoWithId = WithId<Todo>;

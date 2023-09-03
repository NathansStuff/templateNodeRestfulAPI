import { Schema } from 'mongoose';

import { TodoWithId } from './todoType';

export const TodoSchema = new Schema<TodoWithId>(
    {
        content: {
            type: String,
            required: true,
        },
        done: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

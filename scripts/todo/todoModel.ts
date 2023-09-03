import { model, models } from 'mongoose';

import { TodoSchema } from './todoSchema';
import { TodoWithId } from './todoType';

export const TodoModel = models.Todo || model<TodoWithId>('TodoModel', TodoSchema);

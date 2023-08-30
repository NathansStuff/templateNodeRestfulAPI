import express from 'express';

import { TryCatchMiddleware } from '@/middleware/TryCatchMiddleware';

import {
    createTodoHandler,
    deleteTodoHandler,
    getAllTodosHandler,
    getTodoByIdHandler,
    updateTodoHandler,
} from './todoController';

const TodoRouter = express.Router();

TodoRouter.route('/').get(TryCatchMiddleware(getAllTodosHandler)).post(TryCatchMiddleware(createTodoHandler));
TodoRouter.route('/:id')
    .get(TryCatchMiddleware(getTodoByIdHandler))
    .put(TryCatchMiddleware(updateTodoHandler))
    .delete(TryCatchMiddleware(deleteTodoHandler));

export { TodoRouter };

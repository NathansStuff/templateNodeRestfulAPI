import { Request, Response } from 'express';

import { BadRequestError } from '@/exceptions/BadRequestError';
import { ParamsWithId } from '@/types/ParamsWithId';

import { createNewTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from './todoService';
import { Todo, TodoWithId } from './todoType';

// Get all Todos
export async function getAllTodosHandler(req: Request, res: Response<TodoWithId[]>): Promise<void> {
    const Todos = await getAllTodos();
    res.status(200).json(Todos);
}

// Get Todo by id
export async function getTodoByIdHandler(
    req: Request<ParamsWithId, TodoWithId, object>,
    res: Response<TodoWithId>
): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await getTodoById(safeId.id);
    if (!response) throw new BadRequestError('Todo not found');

    res.status(200).json(response);
}

// Create Todo
export async function createTodoHandler(
    req: Request<object, TodoWithId, Todo>,
    res: Response<TodoWithId>
): Promise<void> {
    const safeTodoData = Todo.parse(req.body);
    const newTodo = await createNewTodo(safeTodoData);
    res.status(201).json(newTodo);
}

// Update Todo
export async function updateTodoHandler(
    req: Request<ParamsWithId, TodoWithId, Todo>,
    res: Response<TodoWithId>
): Promise<void> {
    const safeTodoData = Todo.parse(req.body);
    const safeId = ParamsWithId.parse(req.params);

    const result = await updateTodo(safeId.id, safeTodoData);
    if (result) {
        res.status(200).json(result);
    } else {
        throw new BadRequestError('Todo not found');
    }
}

// Delete Todo
export async function deleteTodoHandler(
    req: Request<ParamsWithId, object, object>,
    res: Response<{ message: string }>
): Promise<void> {
    const safeId = ParamsWithId.parse(req.params);
    const response = await deleteTodo(safeId.id);
    if (response === null) throw new BadRequestError('Todo not found');
    const message = `Todo with id ${safeId.id} deleted`;
    res.status(204).json({ message });
}

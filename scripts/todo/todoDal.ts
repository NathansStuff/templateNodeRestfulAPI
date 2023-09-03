import { mongoDBConnect } from '@/middleware/mongoDbConnect';

import { TodoModel } from './todoModel';
import { Todo, TodoWithId } from './todoType';

// Get all Todos
export async function findAllTodos(): Promise<TodoWithId[]> {
    await mongoDBConnect();
    return await TodoModel.find();
}

// Get Todo by ID
export async function findTodoById(id: string): Promise<TodoWithId | null> {
    await mongoDBConnect();
    return await TodoModel.findById(id);
}

// Create a new Todo
export async function createTodo(TodoData: Todo): Promise<TodoWithId> {
    await mongoDBConnect();
    return await TodoModel.create(TodoData);
}

// Update Todo by ID
export async function updateTodoById(id: string, updatedData: Partial<Todo>): Promise<TodoWithId | null> {
    await mongoDBConnect();
    return await TodoModel.findByIdAndUpdate(id, updatedData, { new: true });
}

// Delete Todo by ID
export async function deleteTodoById(id: string): Promise<void | null> {
    await mongoDBConnect();
    return await TodoModel.findByIdAndDelete(id);
}

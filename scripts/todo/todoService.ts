import { createTodo, deleteTodoById, findAllTodos, findTodoById, updateTodoById } from './todoDal';
import { Todo, TodoWithId } from './todoType';

// Get all Todos
export async function getAllTodos(): Promise<TodoWithId[]> {
    const Todos = await findAllTodos();
    return Todos;
}

// Get Todo by id
export async function getTodoById(id: string): Promise<TodoWithId | null> {
    const Todo = await findTodoById(id);
    return Todo;
}

// Create Todo
export async function createNewTodo(Todo: Todo): Promise<TodoWithId> {
    const newTodo = await createTodo(Todo);
    return newTodo;
}

// Update Todo
export async function updateTodo(id: string, updatedData: Partial<Todo>): Promise<TodoWithId | null> {
    const Todo = await updateTodoById(id, updatedData);
    return Todo;
}

// Delete Todo
export async function deleteTodo(id: string): Promise<void | null> {
    const response = await deleteTodoById(id);
    return response;
}

// @flow
import Todo, { type TodoType } from '../models/todo';

export async function findTodosByUserId(id: string): Promise<Array<TodoType>> {
  return Todo.find({ user: id });
}

export async function createNewTodo(
  title: string,
  userId: string,
): Promise<TodoType> {
  const newTodo = new Todo({
    title,
    checked: false,
    user: userId,
  });

  await newTodo.save();

  return newTodo;
}

export async function checkTodoById(id: string): Promise<TodoType> {
  return Todo.findByIdAndUpdate(id, { checked: true }, { new: true });
}

export async function unCheckTodoById(id: string): Promise<TodoType> {
  return Todo.findByIdAndUpdate(id, { checked: false }, { new: true });
}

export async function editTodoById(
  id: string,
  title: string,
): Promise<TodoType> {
  return Todo.findByIdAndUpdate(id, { title }, { new: true });
}

export async function deleteTodoById(id: string): Promise<TodoType> {
  return Todo.findByIdAndRemove(id);
}

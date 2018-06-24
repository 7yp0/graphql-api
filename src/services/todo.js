// @flow
import Todo from '../models/todo';

export async function findTodoByUserId(id: string): Todo {
  return Todo.find({ user: id });
}

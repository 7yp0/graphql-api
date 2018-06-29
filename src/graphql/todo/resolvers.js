// @flow
import type { Context } from '../';
import { type UserType } from '../../models/user';
import { type TodoType } from '../../models/todo';
import { verifyUser } from '../../utils/authorization';
import {
  findTodosByUserId,
  createNewTodo,
  checkTodoById,
  unCheckTodoById,
  editTodoById,
  deleteTodosByIds,
} from '../../services/todo';

export async function todos(
  parent: Object,
  args: Object,
  context: Context,
): Promise<Array<string>> {
  const verifiedUser = verifyUser(context.user);

  const userTodos = await findTodosByUserId(verifiedUser.id);

  return userTodos;
}

export async function createTodo(
  parent: Object,
  { title }: { title: string },
  { user: { id: userId } }: Context,
): Promise<TodoType> {
  return createNewTodo(title, userId);
}

export async function checkTodo(
  parent: Object,
  { id }: { id: string },
): Promise<TodoType> {
  return checkTodoById(id);
}

export async function unCheckTodo(
  parent: Object,
  { id }: { id: string },
): Promise<TodoType> {
  return unCheckTodoById(id);
}

export async function editTodo(
  parent: Object,
  { id, title }: { id: string, title: string },
): Promise<TodoType> {
  return editTodoById(id, title);
}

export async function deleteTodos(
  parent: Object,
  { ids }: { ids: Array<string> },
): Promise<boolean> {
  await deleteTodosByIds(ids);

  return true;
}

function user(parent: Object, args: Object, context: Context): UserType {
  return context.user;
}

export default {
  Query: {
    todos,
  },
  Mutation: {
    createTodo,
    checkTodo,
    unCheckTodo,
    editTodo,
    deleteTodos,
  },
  Todo: {
    user,
  },
};

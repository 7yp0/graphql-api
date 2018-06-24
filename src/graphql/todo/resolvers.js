// @flow
import type { Context } from '../';
import { type UserType } from '../../models/user';
import { verifyUser } from '../../utils/authorization';
import { findTodoByUserId } from '../../services/todo';

export async function todos(
  parent: Object,
  args: Object,
  context: Context,
): Promise<Array<string>> {
  const verifiedUser = verifyUser(context.user);

  const userTodos = await findTodoByUserId(verifiedUser.id);

  return userTodos;
}

function user(parent: Object, args: Object, context: Context): UserType {
  return context.user;
}

// TODO: createTodo - mutation
// TODO: checkTodo  - mutation
// TODO: editTodo   - mutation
// TODO: deleteTodo - mutation

export default {
  Query: {
    todos,
  },
  Mutation: {},
  Todo: {
    user,
  },
};

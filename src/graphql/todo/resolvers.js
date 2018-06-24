// @flow
import type { Context } from '../';
import Todo from './model';
import { verifyUser } from '../../utils/authorization';

async function todos(
  parent: Object,
  args: Object,
  { user }: Context,
): Promise<string> {
  const verifiedUser = verifyUser(user);

  const userTodos = await Todo.find({ user: verifiedUser.id });

  return userTodos;
}

export default {
  Query: {
    todos,
  },
  Mutation: {},
};

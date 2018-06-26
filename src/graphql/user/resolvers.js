// @flow
import { type Context } from '../';
import { type UserType } from '../../models/user';
import { saveNewUser, findUserByEmail } from '../../services/user';
import {
  signToken,
  verifyUser,
  verifyCredentials,
} from '../../utils/authorization';
import UserAlreadyExistsException from '../../exceptions/UserAlreadyExistsException';
import { findTodosByUserId } from '../../services/todo';

async function signUp(
  parent: Object,
  { email, password }: UserType,
): Promise<string> {
  const foundUser = await findUserByEmail(email);

  if (foundUser) {
    throw new UserAlreadyExistsException(email);
  }

  const id = await saveNewUser(email, password);

  const token = signToken(id);

  return token;
}

async function signIn(
  parent: Object,
  { email, password }: UserType,
): Promise<string> {
  const verifiedUser = await verifyCredentials(email, password);

  const token = signToken(verifiedUser.id);

  return token;
}

export async function todos(
  parent: Object,
  args: Object,
  context: Context,
): Promise<Array<string>> {
  const verifiedUser = verifyUser(context.user);

  const userTodos = await findTodosByUserId(verifiedUser.id);

  return userTodos;
}

export default {
  Query: {},
  Mutation: {
    signUp,
    signIn,
  },
  User: {
    todos,
  },
};

// @flow
import { type UserType } from './model';
import { saveNewUser, findUserByEmail } from './service';
import { signToken, verifyCredentials } from '../../utils/authorization';
import UserAlreadyExistsException from '../../exceptions/UserAlreadyExistsException';

async function signUp(
  parent: Object,
  { email, password }: UserType,
): Promise<string> {
  const user = await findUserByEmail(email);

  if (user) {
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
  const user = await verifyCredentials(email, password);

  const token = signToken(user.id);

  return token;
}

export default {
  Query: {},
  Mutation: {
    signUp,
    signIn,
  },
};

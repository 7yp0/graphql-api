// @flow
import type { $Request, $Response, $Next } from 'express';

import { saveNewUser, findUserByEmail } from '../services/users';
import { signToken } from '../utils/authorization';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';

export async function signUp(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  const { email, password } = request.value.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw new UserAlreadyExistsException(email);
  }

  const id = await saveNewUser({
    email,
    password,
  });

  const token = signToken(id);

  response.status(200).json({ token });

  return next();
}

export async function signIn(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  const {
    user: { id },
  } = request;

  const token = signToken(id);

  response.status(200).json({ token });

  next();
}

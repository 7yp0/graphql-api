// @flow
import type { $Request, $Response, $Next } from 'express';

import User from '../models/user';
import UserAlreadyExists from '../exceptions/UserAlreadyExists';
import { handleError } from '../utils/error-handler';

export async function signUp(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  const { email, password } = request.value.body;

  const user = await User.findOne({ email });

  if (user) {
    return handleError(response, new UserAlreadyExists(email));
  }

  const newUser = new User({
    email,
    password,
  });

  await newUser.save();

  // TODO: respond with token
  response.status(200).send('user created');

  return next();
}

export async function signIn(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  response.status(200).send('signin');

  next();
}

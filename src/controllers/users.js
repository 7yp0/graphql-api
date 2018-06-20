// @flow
import type { $Request, $Response, $Next } from 'express';

import User from '../models/user';
import UserAlreadyExists from '../exceptions/UserAlreadyExists';

export async function signUp(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  const { email, password } = request.value.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new UserAlreadyExists(email);
  }

  const newUser = new User({
    email,
    password,
  });

  await newUser.save();

  // TODO: respond with token
  response.status(200).send({ message: 'user created' });

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

// @flow
import type { $Request, $Response, $Next } from 'express';

import User from '../models/user';
import { signToken } from '../utils/authorization';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';

export async function signUp(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  const { email, password } = request.value.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new UserAlreadyExistsException(email);
  }

  const newUser = new User({
    email,
    password,
  });

  await newUser.save();

  const token = signToken(newUser.id);

  response.status(200).json({ token });

  return next();
}

export async function signIn(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  response.status(200).json({ message: 'signed in' });

  next();
}

// @flow
import type { $Request, $Response, $Next } from 'express';

export async function signUp(
  request: $Request,
  response: $Response,
  next: $Next,
): void {
  console.log('signup called');

  response.status(200).send('signup');

  next();
}

export async function signIn(
  request: $Request,
  response: $Response,
  next: $Next,
): void {
  console.log('signin called');

  response.status(200).send('signin');

  next();
}

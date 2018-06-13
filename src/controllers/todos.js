// @flow
import type { $Request, $Response, $Next } from 'express';

export async function getTodos(
  request: $Request,
  response: $Response,
  next: $Next,
): void {
  console.log('getTodos called');

  response.status(200).send('todos');

  next();
}

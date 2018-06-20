// @flow
import type { $Request, $Response, $Next } from 'express';

export async function getTodos(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  response.status(200).json({ messages: 'here are some todos' });

  next();
}

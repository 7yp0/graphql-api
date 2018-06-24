// @flow
import type { $Request, $Response, $Next } from 'express';

import { verifyToken } from '../utils/authorization';
import { findUserById } from '../services/user';

import type { UserType } from '../models/user';

export type AuthorizedRequest = {
  user: UserType,
} & $Request;

export async function authorizeJwt(
  request: $Request,
  response: $Response,
  next: $Next,
): Promise<void> {
  request.user = null;

  const token = request.get('authorization');

  if (!token) {
    next();

    return;
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    next();

    return;
  }

  const user = await findUserById(decodedToken.sub);

  if (!user) {
    next();

    return;
  }

  request.user = user;

  next();
}

// @flow
import type { $Request, $Response, $Next } from 'express';

import { convertJoiError, convertException } from '../utils/errors';

import UnauthorizedException from '../exceptions/UnauthorizedException';
import UnknownException from '../exceptions/UnknownException';

import type { Exception } from '../exceptions';

export function handleError(
  exception: Exception,
  request: $Request,
  response: $Response,
  next: $Next,
) {
  if (exception.type === 'ValidationException') {
    const error = convertJoiError(exception.error, exception.code);

    response.status(exception.status).send(error);

    next(exception);

    return;
  }

  // handle passport jwt strategy errors
  if (exception.name === 'AuthenticationError') {
    const newException = new UnauthorizedException();
    const error = convertException(newException);

    response.status(newException.status).send(error);

    next(newException);

    return;
  }

  if (!exception.code || !exception.status) {
    const newException = new UnknownException();
    const error = convertException(newException);

    // eslint-disable-next-line no-console
    console.error(exception);

    response.status(newException.status).send(error);

    next(newException);

    return;
  }

  const error = convertException(exception);

  response.status(exception.status).send(error);

  next(exception);
}

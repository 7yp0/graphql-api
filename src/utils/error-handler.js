// @flow
import type { Error as JoiError } from 'joi';
import type { $Request, $Response, $Next } from 'express';
import type { Exception } from '../exceptions';
import UnknownException from '../exceptions/UnknownException';

type ApiErrorType = {
  error: {
    code: string,
    type: string,
    message: string,
  },
  payload: ?Object,
};

export function createApiError(
  type: string,
  code: string,
  message: string,
  payload?: ?Object = null,
): ApiErrorType {
  return {
    error: {
      code,
      type,
      message,
    },
    payload,
  };
}

export function convertException(
  exception: Exception,
  payload?: ?Object,
): ApiErrorType {
  return createApiError(
    exception.type,
    exception.code,
    exception.message,
    payload,
  );
}

export function convertJoiError(error: JoiError, code: string): ApiErrorType {
  if (!error.isJoi) {
    return convertException(new UnknownException());
  }

  const {
    name,
    details: [{ message }],
    _object: payload,
  } = error;

  const modifiedMessage = message.replace(/"/g, "'");

  return createApiError(name, code, modifiedMessage, payload);
}

export function handleError(
  exception: Exception,
  request: $Request,
  response: $Response,
  next: $Next,
) {
  if (exception.type === 'ValidationException' && exception.error) {
    const error = convertJoiError(exception.error, exception.code);

    response.status(exception.status).send(error);

    next(exception);

    return;
  }

  const error = convertException(exception);

  response.status(exception.status).send(error);

  next(exception);
}

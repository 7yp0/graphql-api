// @flow
import type { Error as JoiError } from 'joi';
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

export function convertException(exception: Exception): ApiErrorType {
  return createApiError(
    exception.type,
    exception.code,
    exception.message,
    exception.payload,
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

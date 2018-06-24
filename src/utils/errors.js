// @flow
import type { Exception } from '../exceptions';

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

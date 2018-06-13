// @flow
import type { Error as JoiError } from 'joi';
import type { Exception } from '../exceptions';

type ApiErrorType = {
  error: {
    code: string,
    type: string,
    message: string,
  },
  payload: ?Object,
};

type ErrorCodes = {
  [string]: string,
};

export const API_ERROR_CODES: ErrorCodes = {
  UnknownError: '000',
  InvalidError: '001',
  ValidationError: '002',
};

export class ApiError {
  constructor(
    type: string,
    message: string,
    payload?: ?Object = null,
  ): ApiErrorType {
    return {
      error: {
        code: API_ERROR_CODES[type],
        type,
        message,
      },
      payload,
    };
  }
}

export function convertJoiError(error: JoiError): ApiErrorType {
  if (!error.isJoi) {
    return new ApiError('InvalidError', 'Error is not a valid Joi Error');
  }

  const {
    name,
    details: [{ message }],
    _object: payload,
  } = error;

  const modifiedMessage = message.replace(/"/g, "'");

  return new ApiError(name, modifiedMessage, payload);
}

export function convertException(
  exception: Exception,
  payload?: ?Object,
): ApiErrorType {
  return new ApiError(exception.type, exception.message, payload);
}

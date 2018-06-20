// @flow
import joi from 'joi';

import type { $Request, $Response, $Next } from 'express';

import ValidationException from '../exceptions/ValidationException';

export function validateAuthorizationBody(schema: Object): Function {
  return (request: $Request, response: $Response, next: $Next) => {
    const result = joi.validate(request.body, schema);

    if (result.error) {
      throw new ValidationException(result.error);
    }

    if (!request.value) {
      request.value = {};
    }

    request.value.body = result.value;

    return next();
  };
}

export const schemas = {
  authSchema: joi.object().keys({
    email: joi
      .string()
      .required()
      .email(),
    password: joi.string().required(),
  }),
};

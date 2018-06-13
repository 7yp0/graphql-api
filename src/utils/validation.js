// @flow
import joi from 'joi';

import type { $Request, $Response, $Next } from 'express';

export function validateAuthorizationBody(schema: Object): Function {
  return (request: $Request, response: $Response, next: $Next) => {
    const result = joi.validate(request.body, schema);

    if (result.error) {
      // TODO: add error handlin with error codes
      return response.status(400).json(result.error);
    }

    request.body.value = result.value;

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

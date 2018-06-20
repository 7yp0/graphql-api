// @flow
import Es6Error from 'es6-error';
import type { Error as JoiError } from 'joi';

class ValidationException extends Es6Error {
  type = 'ValidationException';
  status = 400;
  code = '001';
  error = null;
  payload = null;

  constructor(error: JoiError) {
    super('joi validation error');

    this.error = error;
  }
}

export default ValidationException;

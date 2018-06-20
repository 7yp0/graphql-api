// @flow
import type { Error as JoiError } from 'joi';

export type Exception = {
  type: string,
  status: number,
  code: string,
  payload: ?Object,
  error?: ?JoiError,
} & Error;

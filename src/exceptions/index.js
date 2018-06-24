// @flow
export type Exception = {
  type: string,
  status: number,
  code: string,
  payload: ?Object,
} & Error;

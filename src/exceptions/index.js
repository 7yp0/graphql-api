// @flow
export type Exception = {
  type: string,
  status: number,
} & Error;

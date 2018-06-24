// @flow
import JWT from 'jsonwebtoken';

import config from '../config';

export type Jwt = {
  iss: string,
  sub: string,
  iat: number,
  exp: number,
};

export function signToken(id: string): string {
  return JWT.sign(
    {
      iss: config.jwtIssuer,
      sub: id,
      iat: new Date().getTime(),
    },
    config.jwtSecret,
    { expiresIn: '1d' },
  );
}

export function verifyToken(token: string): Jwt {
  return JWT.verify(token, config.jwtSecret);
}

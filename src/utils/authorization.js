// @flow
import JWT from 'jsonwebtoken';

import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import { findUserByEmail, isValidPassword } from '../services/user';
import config from '../config';

import type { UserType } from '../models/user';

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

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<UserType> {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new InvalidCredentialsException({ email, password });
  }

  const isMatch = await isValidPassword(user.password, password);

  if (!isMatch) {
    throw new InvalidCredentialsException({ email, password });
  }

  return user;
}

export function verifyUser(user: UserType): UserType {
  if (!user) {
    throw new UnauthorizedException();
  }

  return user;
}

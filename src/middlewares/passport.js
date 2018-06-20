// @flow
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import config from '../config';
import User from '../models/user';
import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';

import type { Jwt } from '../utils/authorization';

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwtSecret,
  },
  async (payload: Jwt, done: Function) => {
    try {
      const user = await User.findById(payload.sub);

      if (!user) {
        done(null, false);

        return;
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
  },
  async (email: string, password: string, done: Function) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        done(new InvalidCredentialsException({ email, password }), false);

        return;
      }

      const isMatch = await user.isValidPassword(password);

      if (!isMatch) {
        done(new InvalidCredentialsException({ email, password }), false);

        return;
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

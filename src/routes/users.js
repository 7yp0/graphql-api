// @flow
import promiseRouter from 'express-promise-router';
import passport from 'passport';

import { signUp, signIn } from '../controllers/users';
import { validateAuthorizationBody, schemas } from '../utils/validation';

const router = promiseRouter();

router
  .route('/signup')
  .post(validateAuthorizationBody(schemas.authSchema), signUp);

router
  .route('/signin')
  .post(
    validateAuthorizationBody(schemas.authSchema),
    passport.authenticate('local', { session: false, failWithError: true }),
    signIn,
  );

export default router;

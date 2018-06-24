// @flow
import promiseRouter from 'express-promise-router';

import { verifyCredentials } from '../middlewares/authorization';
import { validateAuthorizationBody, schemas } from '../utils/validation';
import { signUp, signIn } from '../controllers/users';

const router = promiseRouter();

router
  .route('/signup')
  .post(validateAuthorizationBody(schemas.authSchema), signUp);

router
  .route('/signin')
  .post(
    validateAuthorizationBody(schemas.authSchema),
    verifyCredentials,
    signIn,
  );

export default router;

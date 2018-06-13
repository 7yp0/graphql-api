// @flow
import promiseRouter from 'express-promise-router';

import { signUp, signIn } from '../controllers/users';
import { validateAuthorizationBody, schemas } from '../utils/validation';

const router = promiseRouter();

router
  .route('/signup')
  .post(validateAuthorizationBody(schemas.authSchema), signUp);

router.route('/signin').post(signIn);

export default router;

// @flow
import promiseRouter from 'express-promise-router';
import passport from 'passport';

import { getTodos } from '../controllers/todos';

const router = promiseRouter();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    getTodos,
  );

export default router;

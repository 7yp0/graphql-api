// @flow
import promiseRouter from 'express-promise-router';

import { signUp, signIn } from '../controllers/users';

const router = promiseRouter();

router.route('/signup').post(signUp);

router.route('/signin').post(signIn);

export default router;

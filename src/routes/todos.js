// @flow
import promiseRouter from 'express-promise-router';

import { authorizeJwt } from '../middlewares/authorization';
import { getTodos } from '../controllers/todos';

const router = promiseRouter();

router.route('/').get(authorizeJwt, getTodos);

export default router;

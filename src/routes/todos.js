// @flow
import promiseRouter from 'express-promise-router';

import { getTodos } from '../controllers/todos';

const router = promiseRouter();

router.route('/').get(getTodos);

export default router;

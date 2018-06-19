// @flow
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import users from './routes/users';
import todos from './routes/todos';

const { port, mongoUri } = config;

mongoose.connect(mongoUri);

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/v1/users', users);
app.use('/v1/todos', todos);

// Start the server
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `running at http://${server.address().address}:${server.address().port}`,
  );
});

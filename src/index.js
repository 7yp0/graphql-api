// @flow
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphqlExpress } from 'apollo-server-express';

import config from './config';
import { handleError } from './middlewares/error-handler';
import {
  authorizeJwt,
  type AuthorizedRequest,
} from './middlewares/authorization';
import schema from './graphql/schema';

const { port, mongoUri } = config;

mongoose.connect(mongoUri);

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(authorizeJwt);

// Routes
app.use(
  '/graphql',
  graphqlExpress((request: AuthorizedRequest) => ({
    schema,
    context: { user: request.user },
  })),
);

// Error handling
app.use(handleError);

// Start the server
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `running at http://${server.address().address}:${server.address().port}`,
  );
});

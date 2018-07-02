// @flow
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { graphqlExpress } from 'apollo-server-express';

import type { GraphQLError as GraphQLErrorBase } from 'graphql';

import config from './config';
import { convertException, type ApiErrorType } from './utils/errors';
import {
  authorizeJwt,
  type AuthorizedRequest,
} from './middlewares/authorization';
import UnknownException from './exceptions/UnknownException';
import schema from './graphql/schema';

import type { Exception } from './exceptions';

type GraphQLError<Error> = {
  originalError: Error,
} & GraphQLErrorBase;

const { port, mongoUri } = config;

mongoose.connect(mongoUri);

// TODO add cors
const app = express();

// Middlewares
app.use(cors());;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(authorizeJwt);

// Routes
app.use(
  '/graphql',
  graphqlExpress((request: AuthorizedRequest) => ({
    schema,
    context: { user: request.user },
    formatError({ originalError }: GraphQLError<Exception>): ApiErrorType {
      if (!originalError.code || !originalError.status) {
        const newException = new UnknownException();

        return convertException(newException);
      }

      return convertException(originalError);
    },
  })),
);

// Start the server
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `running at http://${server.address().address}:${server.address().port}`,
  );
});

// @flow
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import config from './config';

const { port } = config;

const app = express();

// Middlewares

// Routes

// Start the server
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `running at http://${server.address().address}:${server.address().port}`,
  );
});

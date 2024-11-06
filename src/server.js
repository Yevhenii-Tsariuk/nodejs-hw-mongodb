import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import cookieParser from 'cookie-parser';

import router from './routers/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 5000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

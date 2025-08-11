import express from 'express';
import 'dotenv/config';

import { env } from './utils/env.js';
import contactRoutes from './routers/contacts.js';
import { loggerMiddleware } from './middlewares/contactMiddlewares.js';
import { corsMiddleware } from './middlewares/corsMidleware.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

const PORT = env('PORT');

app.use('/contacts', contactRoutes);

app.use(notFoundHandler);

app.use(errorHandler);


export function setupServer () {
  app.use(corsMiddleware);
  
  app.use(loggerMiddleware);

  console.log(`Server is running on port ${PORT}`);

  app.listen(PORT, (error) => {
     if (error) {
      throw error;
    }
  });
};


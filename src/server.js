import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();


export const setupServer = async () => {

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
    
  app.use(cors());

  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);
  
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
    
    
  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
  const PORT = Number(env('PORT', 3000));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
setupServer();

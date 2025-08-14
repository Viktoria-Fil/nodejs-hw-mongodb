import dotenv from 'dotenv';
dotenv.config();
import path from 'node:path';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import contactRouter from './routers/contacts.js';
import { env } from './utils/env.js';

import authRouter from './routers/auth.js';
import { auth } from './middlewares/auth.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';



const PORT = Number(env('PORT', '3000'));


async function setupServer () {
  const app = express();

  app.use(express.json());
  app.use(cors());
  

  app.use('/avatars', express.static(path.resolve('src', 'uploads', 'avatars')));
  app.use(cookieParser());
  
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use('/contacts', auth, contactRouter);
  app.use('/auth', authRouter);
  
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);

  });
};

export default setupServer;
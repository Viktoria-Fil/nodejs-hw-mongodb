import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

import contactsRouter from './routers/contacts';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

dotenv.config();
const PORT = Number(process.env.PORT);

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
    app.listen(PORT || 3000, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
setupServer();

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';

import { getAllContactsController } from './controllers/contacts.controller.js';
import { getContactIdController } from './controllers/contact.controller.js';

dotenv.config();
const PORT = Number(process.env.PORT)|| 4000;

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
    
    app.get('/', (req, res) => {
    res.send('Hello World!');
    });
    app.get('/contacts', getAllContactsController);
    
    app.get('/contacts/:contactId', getContactIdController);
    
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

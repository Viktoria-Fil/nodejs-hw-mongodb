import { initMongoConnection } from './db/initMongoConnection.js';
import setupServer from './server.js';
import fs from 'fs';
import path from 'path';


const bootstrap = async () => {
  try {
    await initMongoConnection();

    const tmpPath = path.resolve('src', 'tmp');
    if (!fs.existsSync(tmpPath)) {
      fs.mkdirSync(tmpPath, { recursive: true });
      console.log('Created tmp folder');
    }

    setupServer();
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
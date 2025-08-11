import mongoose from 'mongoose';

import { env } from '../utils/env.js';

async function initMongoConnection() {
  const user = env('MONGODB_USER');
  const pwd = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const db = env('MONGODB_DB');

  return await mongoose.connect(
    `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
  );
}

export { initMongoConnection };

 
//   const cluster = env('MONGODB_CLUSTER_NAME');

//`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=${cluster}`
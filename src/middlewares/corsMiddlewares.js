import cors from 'cors';
import { env } from '../utils/env.js';
const PORT = env('PORT');

export const corsMiddleware = cors({
  origin: `http://localhost:${PORT}`,
  optionsSuccessStatus: 200,
});
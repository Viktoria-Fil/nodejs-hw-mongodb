import pinoHttp from 'pino-http';
const logger = pinoHttp();

export function loggerMiddleware(req, res, next) {
  logger(req, res);

  next();
}
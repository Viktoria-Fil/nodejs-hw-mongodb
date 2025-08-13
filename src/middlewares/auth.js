import createHttpError from 'http-errors';
import { SessionCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';

export async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (typeof authorization !== 'string') {
      throw new createHttpError.Unauthorized('Please, provide access token.');
    }
    const [bearer, accessToken] = authorization.split(' ', 2);
    if (bearer !== 'Bearer' || typeof accessToken === 'undefined') {
      throw new createHttpError.Unauthorized('Please, provide access token.');
    }

    const session = await SessionCollection.findOne({ accessToken });
    if (!session) {
      throw new createHttpError.Unauthorized('Session not found');
    }

    if (session.accessTokenValidUntil < new Date()) {
      throw new createHttpError.Unauthorized('Access token expired');
    }

    const user = await UsersCollection.findOne({ _id: session.userId });
    if (!user) {
      throw new createHttpError.Unauthorized('User not found(');
    }

    req.user = { id: user._id, name: user.name };
    next();
  } catch (error) {
    next(error);
  }
}
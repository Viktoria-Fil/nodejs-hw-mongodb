import notFoundHandler from '../middlewares/notFoundHandler.js';

export default function cWrap (controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      notFoundHandler(req, res, next);

      next(err);
    }
  };
}
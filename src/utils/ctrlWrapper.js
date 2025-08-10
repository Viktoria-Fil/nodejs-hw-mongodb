export const cWrap = (contrl) => {
  return async (req, res, next) => {
    try {
      await contrl(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res) => {
    if (err instanceof HttpError) {
        req.statur(err.status).json({
            status: err.status,
            message: err.name,
            error: err,
        });
        return;
    }

  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    data: err.message
  });
};


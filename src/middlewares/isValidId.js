import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
    const id = req.params.contactId;
    if (!isValidObjectId(id)) {
        throw createHttpError(400, 'Incorrect id.');
    }
    next();
};
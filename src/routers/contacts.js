import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactRouter = express.Router();
const jsonParser = express.json();

import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';


import {
  deleteContactController,
  getAllContactsConroller,
  getContactByIdController,
  postContactController,
  updateContactController,
} from '../controllers/contacts.js';



contactRouter.get('/', ctrlWrapper(getAllContactsConroller));

contactRouter.post('/', validateBody(contactSchema),
  jsonParser,
  ctrlWrapper(postContactController));

contactRouter.get('/:contactId', isValidId,
  ctrlWrapper(getContactByIdController));

contactRouter.delete('/:contactId', isValidId,
  ctrlWrapper(deleteContactController));

contactRouter.patch('/:contactId', isValidId,
  validateBody(contactSchema),
  jsonParser,
  ctrlWrapper(updateContactController));

export default contactRouter;


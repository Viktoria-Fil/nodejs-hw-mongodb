import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactRouter = express.Router();
const jsonParser = express.json();

import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { updateContactSchema } from '../validation/contacts.js';
import { upload } from '../middlewares/upload.js';

import {
  deleteContactController,
  getAllContactsConroller,
  getContactByIdController,
  postContactController,
  updateContactController,
} from '../controllers/contacts.js';



contactRouter.get('/', ctrlWrapper(getAllContactsConroller));

contactRouter.post('/', 
  upload.single('photo'),
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(postContactController));

contactRouter.get('/:contactId', isValidId,
  ctrlWrapper(getContactByIdController));

contactRouter.delete('/:contactId', isValidId,
  ctrlWrapper(deleteContactController));

contactRouter.patch('/:contactId',
  upload.single('photo'),
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController));

export default contactRouter;
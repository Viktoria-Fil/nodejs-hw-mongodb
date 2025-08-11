import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactRouter = express.Router();
const jsonParser = express.json();


import {
  deleteContactController,
  getAllContactsConroller,
  getContactByIdController,
  postContactController,
  updateContactController,
} from '../controllers/contacts.js';



contactRouter.get('/', ctrlWrapper(getAllContactsConroller));
contactRouter.post('/', jsonParser, ctrlWrapper(postContactController));
contactRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
contactRouter.patch('/:contactId',  jsonParser, ctrlWrapper(updateContactController));

export default contactRouter;


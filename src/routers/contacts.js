import express from 'express';
import  cWrap  from '../utils/ctrlWrapper.js';
const contactRoutes = express.Router();
const jsonParser = express.json();


import {
  deleteContactController,
  getAllContactsConroller,
  getContactByIdController,
  postContactController,
  updateContactController,
} from '../controllers/contacts.js';


contactRoutes.get('/', cWrap(getAllContactsConroller));
contactRoutes.post('/', jsonParser, cWrap(postContactController));
contactRoutes.get('/:contactId', cWrap(getContactByIdController));
contactRoutes.delete('/:contactId', cWrap(deleteContactController));
contactRoutes.patch(
  '/:contactId',  jsonParser, cWrap(updateContactController),);

export default contactRoutes;


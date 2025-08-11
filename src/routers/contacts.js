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


contactRoutes.get('/contacts', cWrap(getAllContactsConroller));
contactRoutes.post('/contacts', jsonParser, cWrap(postContactController));
contactRoutes.get('/contacts/:contactId', cWrap(getContactByIdController));
contactRoutes.delete('/contacts/:contactId', cWrap(deleteContactController));
contactRoutes.patch(
  '/contacts/:contactId',  jsonParser, cWrap(updateContactController),);

export default contactRoutes;


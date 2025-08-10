import { Router } from 'express';
import {
  getContactByIdContr,
  getContactsContr,
  createContactContr,
  updateContactContr,
  deleteContactContr,
} from '../controllers/contacts.js';
import { cWrap } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', cWrap(getContactsContr));
router.get('/contacts/:contactId', cWrap(getContactByIdContr));
router.post('/contacts', cWrap(createContactContr));
router.patch('/contacts/:contactId', cWrap(updateContactContr));
router.delete('/contacts/:contactId', cWrap(deleteContactContr));

export default router;


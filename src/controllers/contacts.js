import createError from 'http-errors';
import {getAllContacts, getContactById, createContact, deleteContact, updateContact} from "../services/contacts.js";

export const getContactsContr = async (req, res, next) => {
  const contacts = await getAllContacts();
  if (contacts.length === 0) {
    next(createError(404, 'Contacts not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdContr = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    next(createError(404, `Contact not found`));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactContr = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const updateContactContr = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    next(createError(404, `Contact with id ${contactId} was not found`));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createError(404, `Contact with id ${contactId} was not found`));
    return;
  }
  res.status(204).send();
};



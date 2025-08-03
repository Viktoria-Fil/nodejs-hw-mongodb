import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

export const getContactsById = async (contactId) => {
  try {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
};
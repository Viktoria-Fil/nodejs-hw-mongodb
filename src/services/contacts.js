import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contacts = await ContactsCollection.findById(id);
  return contacts;
};

export const postContact = async (payload) => {
  return ContactsCollection.create(payload);
};

export const updateContact = async (id, payload) => {
  return ContactsCollection.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteContact = async (id) => {
  return ContactsCollection.findByIdAndDelete(id);
};
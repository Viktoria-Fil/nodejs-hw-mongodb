import { ContactsCollection } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (id) => {
  const contacts = await ContactsCollection.findById(id);
  return contacts;
};

export const postContact = async (payload) => {
  const contacts = await ContactsCollection.create(payload);
  return contacts;
};

export const updateContact = async (id, payload) => {
  return ContactsCollection.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteContact = async (id) => {
  const contacts = await ContactsCollection.findByIdAndDelete(id);
  return contacts;
};
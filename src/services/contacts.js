import { ContactsCollection } from '../models/contact.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  filter) => {
  const contactQuery = ContactsCollection.find();
  if (typeof filter.type != 'undefined') {
    contactQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite == true || filter.isFavourite == false) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.countDocuments(contactQuery),
    ContactsCollection.find()
      .merge(contactQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  const totalPages = Math.ceil(totalItems / perPage);
  return {
    data: contacts,
    totalItems,
    page,
    perPage,
    totalPages: totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
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
import { ContactsCollection } from '../models/contact.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  filter, ownerId) => {
  const contactQuery = ContactsCollection.find({ userId: ownerId });
  if (typeof filter.type != 'undefined') {
    contactQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite == true || filter.isFavourite == false) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.countDocuments(contactQuery),
    ContactsCollection.find({ userId: ownerId })
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


export const getContactById = async ({ id, ownerId }) => {
  const contacts = await ContactsCollection.findOne({ _id: id, userId: ownerId });
  return contacts;
};

export const postContact = async ({ payload, ownerId, photo }) => {
  return ContactsCollection.create({ ...payload, userId: ownerId, photo });
};

export const updateContact = async ({ id, payload, ownerId, photo }) => {
  return ContactsCollection.findOneAndUpdate({ _id: id, userId: ownerId }, payload, {
    new: true,
  });
};

export const deleteContact = async ({ id, ownerId }) => {
  return ContactsCollection.findOneAndDelete({ _id: id, userId: ownerId });
};
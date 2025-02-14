import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../contacts/index.js";


export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;


    const contactsQuery = ContactsCollection.find({userId});
    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite !== undefined) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

    const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({[sortBy]: sortOrder})
    .exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
      data: contacts,
      ...paginationData,
    };

};
export const getContactById = async (userId, contactId) => {
    return await ContactsCollection.findOne({userId, _id: contactId});
};

export const createContact = async (payload) => {
    const student = await ContactsCollection.create(payload);
    return student;
};

export const deleteContact = async (userId, contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({
      userId,
        _id: contactId,
    });
    return contact;
};
export const updateContact = async (userId, contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      {userId, _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

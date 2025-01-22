import { ContactsCollection } from "../db/models/contacts.js";


export const getAllContacts = async () => {
    return await ContactsCollection.find();

};
export const getContactById = async (contactId) => {
    return await ContactsCollection.findById(contactId);
};

export const createContact = async (payload) => {
    const student = await ContactsCollection.create(payload);
    return student;
};

export const deleteContact = async (contactId) => {
    const student = await ContactsCollection.findOneAndDelete({
        _id: contactId,
    });
    return student;
};
export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
      { _id: contactId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
      student: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

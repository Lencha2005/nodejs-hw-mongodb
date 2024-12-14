import { ContactsCollection } from "../db/models/contact.js";

export const getContacts = () => ContactsCollection.find();

export const getContactById = (contactId) => ContactsCollection.findById(contactId);

export const createContact = (payload) =>  ContactsCollection.create(payload);

export const updateContact = async (contactId, payload, options = {}) => {
    const result = await ContactsCollection.findOneAndUpdate(
        {_id: contactId},
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if(!result || !result.value) return null;

    return {
        contact: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted)
    };
};

export const deleteContact = (contactId) => ContactsCollection.findOneAndDelete(contactId);



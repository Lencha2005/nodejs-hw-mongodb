import { ContactsCollection } from "../db/models/contacts.js";

export const getContacts = () => ContactsCollection.find();

export const getContactById = (contactId) => {
 return ContactsCollection.findById(contactId);
}

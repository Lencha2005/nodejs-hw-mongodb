import { ContactsCollection } from "../db/models/contact.js";

export const getContacts = () => ContactsCollection.find();

export const getContactById = (contactId) => {
 return ContactsCollection.findById(contactId);
}

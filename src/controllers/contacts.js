import { createContact, getAllContacts, getContactById, deleteContact, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res) => {
    const response = await getAllContacts();


    res.json ({
        status: 200,
        message: 'Successfully found students!',
        data: response,
    });
};



 export const getContactByIdController = async (req, res, next) => {
    const {contactId} = req.params;
    const response = await getContactById (contactId);
    if (!response){
        throw createHttpError(404,'Contact not found');
    }

    res.json({
        status: 200,
        message:  `Successfully found contact with id ${contactId}!`,
        data: response,
    });
 };

 export const createContactController = async (req, res) => {
    const {name, phoneNumber, contactType} = req.body;

    if(!name || !phoneNumber || !contactType) {
        return res.status(400).json({
            status: 400,
            message: 'Name, phone number, and contact type are required.',
        });
    }
    const student = await createContact(req.body);

    res.status(201).json({
        status:201,
        message:`Successfully created a contact!`,
        data: student,
    });
};
    export const deleteContactController = async (req, res, next) => {
        const {contactId} = req.params;
        const student = deleteContact(contactId);

        if(!student){
            next(createHttpError(404, 'Contact not found'));
            return;
        }
        res.status(204).send();
    };

    export const patchContactController = async (req, res, next) => {
const {contactId} = req.params;
const result = await updateContact(contactId, req.body);

if(!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
}
res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
    };

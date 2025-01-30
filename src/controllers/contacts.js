import { createContact, getAllContacts, getContactById, deleteContact, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";



export const getContactsController = async (req, res) => {
    const {page, perPage} = parsePaginationParams(req.query);

    const {sortBy, sortOrder} = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const response = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });


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
        try {
            const {contactId} = req.params;
        const student = await deleteContact(contactId);

        if(!student){

            next(createHttpError(404, 'Contact not found'));
    return;
        }
        res.status(204).json({
            status: 204,
            message: 'Contact successfully deleted',
            data: student,
        });
    } catch (error) {
        next(error);
    }
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
    data: result.student,
  });
    };

    export const upsertContactController = async (req,res, next) => {
        const {contactId} = req.params;
        const result = await updateContact(contactId, req.body, {
            upsert: true,
        });
        if (!result) {
            next(createHttpError(404, 'Contact not founder'));
            return;
        }
        const status = result.isNew ? 201 : 200;
        res.status(status).json({
            status,
            message: `Successfully upserted a contact!`,
            data: result.contact,
        });
    };



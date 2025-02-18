import { createContact, getAllContacts, getContactById, deleteContact, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { getEnvVar } from "../utils/getEnvVar.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";



export const getContactsController = async (req, res) => {
    const {_id: userId} = req.user;
    const {page, perPage} = parsePaginationParams(req.query);

    const {sortBy, sortOrder} = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        userId,
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
    });


    res.json ({
        status: 200,
        message: 'Successfully found students!',
        data: contacts,
    });
};



 export const getContactByIdController = async (req, res, next) => {
    const {_id: userId} = req.user;
    const {contactId} = req.params;
    const contact = await getContactById (userId,contactId);
    if (!contact){
        throw createHttpError(404,'Contact not found');
    }

    res.json({
        status: 200,
        message:  `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
 };

 export const createContactController = async (req, res) => {
    const{_id: userId} = req.user;
    const {name, phoneNumber, contactType, email, isFavorite} = req.body;
    const photo = req.file;

    let photoUrl;
    if(photo){
        if(getEnvVar('ENABLE_CLOUDINARY') === 'true'){
            photoUrl = await saveFileToCloudinary(photo);
        }else {
            photoUrl = await saveFileToUploadDir(photo);

        }
    }
    if(!name || !phoneNumber || !contactType) {
        return res.status(400).json({
            status: 400,
            message: 'Name, phone number, and contact type are required.',
        });
    }
    const payload = {
        name,
        phoneNumber,
        contactType,
        email,
        isFavorite,
        userId,
        photo: photoUrl,
    };
    const contact = await createContact(payload);

    res.status(201).json({
        status:201,
        message:`Successfully created a contact!`,
        data: contact,
    });
};
    export const deleteContactController = async (req, res, next) => {
        const {_id: userId} = req.user;
            const {contactId} = req.params;
        const contact = await deleteContact(userId, contactId);

        if(!contact){

            next(createHttpError(404, 'Contact not found'));
    return;
        }
        res.status(204).send();
};

    export const patchContactController = async (req, res, next) => {
        const{_id: userId} = req.user;
const {contactId} = req.params;
const photo = req.file;

let photoUrl;

if(photo) {
    if(getEnvVar('ENABLE_CLOUDINARY') === 'true'){
        photoUrl = await saveFileToCloudinary(photo);
    }else {
        photoUrl = await saveFileToUploadDir(photo);
    }
}

const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
});

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



import { Router } from "express";
import  {getContactByIdController, getContactsController, createContactController, deleteContactController, patchContactController, upsertContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from '../validation/isValidId.js';
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";


const contactsRouter = Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));


contactsRouter.get('/:contactId',isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.delete('/:contactId', isValidId,  ctrlWrapper(deleteContactController));
contactsRouter.use('/', authenticate);

contactsRouter.post('/',
upload.single('photo'),
validateBody(createContactSchema),
ctrlWrapper(createContactController),
);
contactsRouter.put(
    '/:contactId',
    isValidId,
    upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(upsertContactController),
);
contactsRouter.patch(
    '/:contactId',
    upload.single('photo'),
    isValidId,
    validateBody(updateContactSchema),
    ctrlWrapper(patchContactController),
);



export default contactsRouter;




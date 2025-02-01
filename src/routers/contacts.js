import { Router } from "express";
import  {getContactByIdController, getContactsController, createContactController, deleteContactController, patchContactController, upsertContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from '../validation/isValidId.js';


const router = Router();

router.get('/contacts',ctrlWrapper(getContactsController));


router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', isValidId,  ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', validateBody(createContactSchema),ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema),ctrlWrapper(patchContactController));

export default router;




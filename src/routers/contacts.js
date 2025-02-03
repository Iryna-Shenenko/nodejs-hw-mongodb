import { Router } from "express";
import  {getContactByIdController, getContactsController, createContactController, deleteContactController, patchContactController, upsertContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from '../validation/isValidId.js';


const router = Router();

router.get('/',ctrlWrapper(getContactsController));


router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/register', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId,  ctrlWrapper(deleteContactController));
router.put('/:contactId',isValidId, validateBody(createContactSchema),ctrlWrapper(upsertContactController));

router.patch('/:contactId', isValidId, validateBody(updateContactSchema),ctrlWrapper(patchContactController));

export default router;




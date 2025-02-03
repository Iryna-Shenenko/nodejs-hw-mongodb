import Joi from "joi";
import {loginUserSchema} from '../validation/auth';
import { loginUserController } from "../controllers/auth.js";
import router from "../routers/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

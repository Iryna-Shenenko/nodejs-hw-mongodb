import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { refreshUserSessionController, registerUserController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema } from "../validation/auth.js";
import { logoutUserController } from "../controllers/auth.js";
import { loginUserSchema } from "../validation/auth.js";
import { loginUserController } from "../controllers/auth.js";



const authRouter = Router();

authRouter.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));
authRouter.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

export default authRouter;

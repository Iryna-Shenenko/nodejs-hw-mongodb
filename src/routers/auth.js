import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getGoogleOAuthUrlController, loginWithGoogleController, refreshUserSessionController, registerUserController, requestRestEmailController, resetPasswordController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginWithGoogleOAuthSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
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
authRouter.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestRestEmailController),);
authRouter.post('/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);
authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
authRouter.post('/confirm-oauth', validateBody(loginWithGoogleOAuthSchema),
ctrlWrapper(loginWithGoogleController),
);


export default authRouter;

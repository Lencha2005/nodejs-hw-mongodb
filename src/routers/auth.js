import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerSchema } from '../validation/auth.js';
import { loginUserController, refreshTokenController, registerUserController, logoutUserController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
    "/register",
    validateBody(registerSchema),
    ctrlWrapper(registerUserController),
);

authRouter.post(
    "/login",
    validateBody(loginSchema),
    ctrlWrapper(loginUserController),
 );

 authRouter.post("/refresh", ctrlWrapper(refreshTokenController));

 authRouter.post("/logout", ctrlWrapper(logoutUserController))

export default authRouter;

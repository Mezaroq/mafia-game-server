import {Router} from "express";
import {registerSchema} from "../schemas/auth/register.schema";
import {validationErrorHandler} from "../middlewares/error/validation-error-handler.middleware";
import * as AuthController from "../controllers/auth.controller";
import {restricted} from "../middlewares/auth/restricted.middleware";

export const AuthRouter = Router();

AuthRouter.post('/register', registerSchema, validationErrorHandler, AuthController.createUser);
AuthRouter.get('/confirm', AuthController.confirmUser);
AuthRouter.post('/login', AuthController.authenticateUser);
AuthRouter.post('/logout', restricted, AuthController.logoutUser);
AuthRouter.get('/logout-all', restricted, AuthController.logoutUserFromAny);
AuthRouter.post('/refresh', AuthController.refreshToken);

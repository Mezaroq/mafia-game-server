import {Router} from "express";
import {json} from "body-parser";
import {parseErrorHandler} from "./error/parse-error-handler.middleware";
import {translationCode} from "./translate/translation-code.middleware";

export const middleware = Router();

middleware.use(json());
middleware.use(translationCode);
middleware.use(parseErrorHandler);

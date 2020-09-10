import {NextFunction, Request, Response} from "express";
import {LanguageCode} from "../../message/translate/translate";

export function translationCode(req: Request, res: Response, next: NextFunction) {
  for (let code in LanguageCode) {
    if (req.get('LanguageCode') === code) {
      break;
    }
  }
  return next();
}

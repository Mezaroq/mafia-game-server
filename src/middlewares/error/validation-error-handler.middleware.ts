import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator"
import {translateMessage, errorMessage} from "../../utils/message/strings.util";
import {first, map} from "rxjs/operators";
import {fromArray} from "rxjs/internal/observable/fromArray";

export function validationErrorHandler(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fromArray(errors.array({onlyFirstError: true}))
      .pipe(
        map(value => errorMessage(translateMessage(req.get('LanguageCode'), value.msg), value.param)),
        first()
      ).subscribe(error => res.status(406).json(error));
  }
  next();
}

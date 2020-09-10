import {NextFunction, Request, Response} from "express";
import {errorMessage} from "../../utils/message/strings.util";

export function parseErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  return err ? res.status(500).json(errorMessage(err.message, "JSON Parse Error")) : next();
}

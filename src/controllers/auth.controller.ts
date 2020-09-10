import {Request, Response} from "express";
import * as AuthService from "../services/auth/auth.service";
import {sendRegisterMail} from "../services/mailer/mailer.service";
import {errorMessage, translateMessage} from "../utils/message/strings.util";
import {MessageKey} from "../message/translate/translate";
import {capitalize} from "lodash";

export function createUser(req: Request, res: Response) {
  AuthService.createUser({email: req.body.email, password: req.body.password, name: req.body.name}).subscribe(
    (user: any) => {
      sendRegisterMail(user.email, user.id);
      res.sendStatus(201);
    },
    () => {
      res.status(500).json(
        errorMessage(translateMessage(req.get('LanguageCode'), MessageKey.errRegFail), 500))
    });
}

export function confirmUser(req: Request, res: Response) {
  AuthService.confirmUser(req.query.token).subscribe(
    (user: any) => {
      if (user)
        return res.status(200).render('pages/confirm', {user: {name: capitalize(user.name), email: user.email}});
      return res.status(404).render('pages/confirm-error');
    });
}

export function authenticateUser(req: Request, res: Response) {
  AuthService.loginUser({password: req.body.password, email: req.body.email}).subscribe(
    tokens => tokens ? res.status(200).json(tokens) : res.sendStatus(401));
}

export function logoutUser(req: Request, res: Response) {
  AuthService.logoutUser(req.body.refreshToken).subscribe(
    isDeleted => res.sendStatus(isDeleted ? 200 : 500)
  )
}

export function logoutUserFromAny(req: Request | any, res: Response) {
  AuthService.logoutUserFromAny(req.user).subscribe(
    isLogout => res.sendStatus(isLogout ? 200 : 500)
  )
}

export function refreshToken(req: Request, res: Response) {
  AuthService.refreshToken(req.body.refreshToken).subscribe(
    tokens => tokens ? res.status(200).json(tokens) : res.sendStatus(401)
  )
}

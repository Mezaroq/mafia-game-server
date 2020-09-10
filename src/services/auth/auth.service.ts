import {catchError, map, switchMap} from "rxjs/operators";
import {from, Observable, of, throwError} from "rxjs";
import {User as UserModel} from "../../models/user/user.model";
import {Document} from "mongoose";
import {generateTokens, Payload, Tokens, validateToken} from "../../utils/jwt/jwt.util";
import {comparePassword} from "../../utils/encoders/password-encoder.util";
import {Token} from "../../models/auth/token.model";

interface User {
  id?: string,
  _id?: string,
  email: string;
  password: string;
  name?: string;
}

export function createUser(user: User) {
  return from((new UserModel(user).save()));
}

export function confirmUser(token: string | any): Observable<Document | null> {
  return from(UserModel.findByIdAndUpdate(token, {$set: {isConfirmed: true, updatedAt: Date.now()}}))
    .pipe(
      map(user => !!user ? user : null),
      catchError(() => of(null))
    )
}

export function loginUser(user: User): Observable<Tokens | null> {
  return from(UserModel.findOne({email: user.email}).select(['password', 'role', 'isConfirmed']).exec()).pipe(
    map((user: any) => user.isConfirmed ? user : null),
    switchMap((doc: any) =>
      from(comparePassword(user?.password, doc?.password)).pipe(
        switchMap(confirm => confirm ? generateTokens(doc.id).pipe(
          map(tokens => ({tokens, id: doc.id}))) : throwError('Invalid Password')),
      )),
    switchMap((obj: any) => from(new Token({token: obj.tokens.refreshToken, user: obj.id}).save()).pipe(
      map(savedToken => savedToken ? obj.tokens : throwError('DB fail'))
    )),
    catchError(() => of(null))
  )
}

export function refreshToken(refreshToken: string) {
  return validateToken(refreshToken).pipe(
    switchMap((payload: Payload | null) => (payload && payload.refresh) ? from(Token.findOne({token: refreshToken}).exec())
      .pipe(
        switchMap(token => token ? generateTokens(payload.id) : throwError('Incorrect Token'))
      ) : from(Token.findOneAndRemove({token: refreshToken}).exec())
      .pipe(
        switchMap(() => throwError('Incorrect Token'))
      )
    ),
    switchMap((tokens: Tokens) =>
      from(Token.updateOne(
        {token: refreshToken},
        {token: tokens.refreshToken}).exec()).pipe(
        map(token => token ? tokens : of(null))
      )
    ),
    catchError(() => of(null))
  )
}

export function logoutUser(refreshToken: string) {
  return from(Token.findOneAndRemove({token: refreshToken}).exec()).pipe(
    map(() => true),
    catchError(() => of(false))
  )
}

export function logoutUserFromAny(user: User) {
  return from(Token.deleteMany({user: user._id}).exec()).pipe(
    map(value => !!value?.ok),
    catchError(() => of(false))
  )
}

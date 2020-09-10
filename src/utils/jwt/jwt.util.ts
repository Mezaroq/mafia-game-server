import jwt from "jsonwebtoken"
import {Environment} from "../../environment/environment";
import {forkJoin, Observable} from "rxjs";

export interface Payload {
  id: string,
  refresh: boolean
}

export interface Tokens {
  token: string,
  refreshToken: string
}

const secret = Environment.JWT_SECRET_KEY;
const tokenExp: string = Environment.JWT_TOKEN_EXPIRE;
const refreshTokenExp: string = Environment.JWT_REFRESH_TOKEN_EXPIRE;

export function generateToken(payload: Payload, expiredIn: string): Observable<string> {
  return new Observable(subscriber => {
    jwt.sign(payload, secret, {expiresIn: expiredIn},
      function (err: Error | null, encoded: string | undefined) {
        if (err)
          subscriber.error(err);
        else
          subscriber.next(encoded);
        subscriber.complete();
      })
  })
}

export function generateTokens(id: string): Observable<Tokens> {
  return forkJoin({
    token: generateToken({id, refresh: false}, tokenExp),
    refreshToken: generateToken({id, refresh: true}, refreshTokenExp)
  });
}

export function validateToken(token: string): Observable<Payload | null> {
  return new Observable(subscriber => {
    jwt.verify(token, secret, ((err: Error | null, decoded: Payload | any) => {
      if (err)
        subscriber.next(null);
      else
        subscriber.next(decoded);
      subscriber.complete();
    }))
  })
}

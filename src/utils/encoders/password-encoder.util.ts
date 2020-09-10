import bCrypt from "bcrypt";
import {Environment} from "../../environment/environment";

const SALT_ROUND: number = parseInt(Environment.PASSWORD_SALT_ROUND);

export function hashPassword(password: string): Promise<string> {
  return bCrypt.hash(password, SALT_ROUND);
}

export function comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
  return bCrypt.compare(password, encryptedPassword)
}

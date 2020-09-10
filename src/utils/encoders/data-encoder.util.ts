import {AES, enc} from "crypto-js";
import {Environment} from "../../environment/environment";

const SECRET: string = Environment.DATA_SECRET_KEY;

export function encodeAES(data: string): string {
  return AES.encrypt(data, SECRET).toString();
}

export function decodeAES(encodedData: string): string {
  return AES.decrypt(encodedData, SECRET).toString(enc.Utf8);
}

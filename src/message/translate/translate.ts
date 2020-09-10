import {PL} from "./lang/pl";
import {EN} from "./lang/en";

export enum LanguageCode {
  PL = 'PL',
  EN = 'EN'
}

export enum MessageKey {
  errRegFail = "errRegFail",
  valRegIncorrectMail = "valRegIncorrectMail",
  valRegAccountExists = "valRegAccountExists",
  valRegPasswordMinLength = "valRegPasswordMinLength",
  valRegPasswordMatch = "valRegPasswordMatch",
  valRegNameNotEmpty = "valRegNameNotEmpty",
  valRegNameIncorrectChars = "valRegNameIncorrectChars",
  valRegNameMinLength = "valRegNameMinLength"
}

export interface Translate {
  [key: string]: string,
  errRegFail: string,
  valRegIncorrectMail: string,
  valRegAccountExists: string,
  valRegPasswordMinLength: string,
  valRegPasswordMatch: string,
  valRegNameNotEmpty: string,
  valRegNameIncorrectChars: string,
  valRegNameMinLength: string
}

export function Translate(languageCode: LanguageCode | any): Translate {
  switch (languageCode) {
    case LanguageCode.PL:
      return PL;
    case LanguageCode.EN:
      return EN;
    default:
      return PL;
  }
}

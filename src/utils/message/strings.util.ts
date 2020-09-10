import {LanguageCode, MessageKey, Translate} from "../../message/translate/translate";

export const translateMessage = (languageCode: LanguageCode | any, messageKey: MessageKey | string) => Translate(languageCode)[messageKey];
export const errorMessage = (message: string, developerMessage: any) => ({message, developerMessage});

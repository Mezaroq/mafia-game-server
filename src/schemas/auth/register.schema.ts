import {checkSchema} from "express-validator"
import {User} from "../../models/user/user.model";
import {MessageKey} from "../../message/translate/translate";

export const registerSchema = checkSchema({
  email: {
    in: "body",
    isEmail: {
      errorMessage: MessageKey.valRegIncorrectMail
    },
    custom: {
      options: (email) => {
        return User.findOne({email: email}).exec().then(user =>{
          if (user)
            return Promise.reject(MessageKey.valRegAccountExists)
        })
      }
    },
  },
  password: {
    in: "body",
    errorMessage: MessageKey.valRegPasswordMinLength,
    isLength: {
      options: {min: 8}
    },
    matches: {
      options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      errorMessage: MessageKey.valRegPasswordMatch
    }
  },
  name: {
    in: "body",
    isEmpty: {
      negated: true,
      errorMessage: MessageKey.valRegNameNotEmpty
    },
    matches: {
      options: /^[A-Za-z]+$/,
      errorMessage: MessageKey.valRegNameIncorrectChars
    },
    isLength: {
      errorMessage: MessageKey.valRegNameMinLength,
      options: {
        min: 3
      }
    }
  }
});

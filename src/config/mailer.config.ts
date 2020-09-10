import nodeMailer from "nodemailer";
import {Environment} from "../environment/environment";

export const Transport = nodeMailer.createTransport({
  host: Environment.MAILER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: Environment.MAILER_USER,
    pass: Environment.MAILER_PASSWORD
  }
});

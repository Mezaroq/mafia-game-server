import {Transport} from "../../config/mailer.config";
import {Strings} from "../../message/strings";
import {layout} from "../../utils/engine/mustache-engine.util";
import {Environment} from "../../environment/environment";

export function sendRegisterMail(to: string, token: string) {
  Transport.sendMail({
    from: {name: Environment.MAILER_REGISTER_NAME, address: Environment.MAILER_REGISTER_SENDER},
    to,
    subject: Strings.confirm_mail_subject,
    html: layout('layouts/email/confirm', {
      confirmUrl: `${Environment.MAILER_REGISTER_URL}/confirm?token=${token}`
    })
  }).then(
    () => console.log(`Send mail success`),
    reason => console.log(`Send email fail ${reason}`))
}

export function sendMail(from: string, to: string, subject: string, html: string) {
  Transport.sendMail({
    from,
    to,
    subject,
    html
  }).then(
    () => console.log(`Send mail success`),
    reason => console.log(`Send email fail ${reason}`))
}

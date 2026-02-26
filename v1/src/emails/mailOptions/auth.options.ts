import { passwordResetEmail, verificationEmail, welcomeEmail } from "../templates"


export const verificationEmailOption = (email:string, firstName:string, code:string) => {
  return {
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Landstoxx - Verify your Email",
    text: 'Verify Your Email',
    html: verificationEmail(firstName, code)
  }
}

export const welcomeEmailOption = (email:string, firstName:string) => {
  return {
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Landstoxx - Welcome To Landstoxx",
    text: 'Welcome To Landstoxx',
    html: welcomeEmail(firstName)
  }
}

export const passwordResetEmailOption = (email:string, firstName:string, code:string) => {
  return {
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Landstoxx - Reset your password",
    text: 'Reset your password',
    html: passwordResetEmail(firstName, code)
  }
}
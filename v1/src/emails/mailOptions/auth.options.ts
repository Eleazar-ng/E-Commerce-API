import { verificationEmail } from "../templates"


export const verificationEmailOption = (email:string, firstName:string, code:string) => {
  return {
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Landstoxx - Verify your Email",
    text: 'Verify Your Email',
    html: verificationEmail(firstName, code)
  }
}
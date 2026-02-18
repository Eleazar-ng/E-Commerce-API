import EventEmitter from "events";
import { Resend } from "resend";
import { env } from "../config/env";

const resend = new Resend(env.RE_API_KEY);

export class EventHandlers {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter){
    this.eventEmitter = eventEmitter;
  }

  registerEventHandlers() {
    console.log('\x1b[35m' + 'Registering event handlers....' + '\x1b[0m');

    this.eventEmitter.on('sendVerificationEmail', async ({ mailOptions, type }) => {
      console.log('Preparing to send email')
      const { data, error } = await resend.emails.send(mailOptions)
      if(error){
        console.error('\x1b[31m' + `Email Error for ${type}: `, error)
        console.log('\x1b[0m')
      }else {
        console.log('\x1b[32m' + `${type} email sent successfully` + '\x1b[0m')
        console.log(`${type} Info: `, data.id);
      }
      // .then((data) => {
      //   console.log(`${type} Email sent: `, data);
      // })
      // .catch((error) => {
      // 
      // })
    })

    console.log('\x1b[32m' + 'Event handlers registered successfully' + '\x1b[0m')
  }
}
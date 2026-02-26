import EventEmitter from "events";

export class EmailService {
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter){
    this.eventEmitter = eventEmitter
  }

  sendEmailVerificationEmail (mailOptions:any, type:string){
    console.log(`Sending ${type} email to a new registered user`); 
    this.eventEmitter.emit('sendVerificationEmail', {mailOptions, type}); 
  }

  sendWelcomeEmail (mailOptions:any, type:string){
    console.log(`Sending ${type} email to a new registered user`); 
    this.eventEmitter.emit('sendWelcomeEmail', {mailOptions, type}); 
  }

  sendPasswordResetEmail (mailOptions:any, type:string){
    console.log(`Sending ${type} email to an existing user`); 
    this.eventEmitter.emit('sendPasswordResetEmail', {mailOptions, type}); 
  }

}
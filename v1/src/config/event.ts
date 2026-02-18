import EventEmitter from "events";
import { EventHandlers } from "../events";
import { EmailService } from "../events/emails";

const eventEmitter = new EventEmitter();
const eventHandler = new EventHandlers(eventEmitter);
const emailService = new EmailService(eventEmitter);

export { eventHandler, emailService}
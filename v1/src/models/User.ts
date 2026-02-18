import { Schema } from "mongoose";
import { Account } from "./Account";
import { IUser } from "../interfaces";

const userSchema: Schema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [50, 'First name cannot be more than 50 characters'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: [50, 'Last name cannot be more than 50 characters'],
    trim: true
  },
  phone: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  dateOfBirth: Date,
  preferences: {
    newsletter: {
      type: Boolean,
      default: false
    },
    notifications: {
      type: Boolean,
      default: false
    },
  }
})

export const User = Account.discriminator<IUser>('User', userSchema)
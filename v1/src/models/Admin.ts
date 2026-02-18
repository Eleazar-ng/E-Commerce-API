import { Schema } from "mongoose";
import { Account } from "./Account";
import { IAdmin } from "../interfaces";

const adminSchema: Schema = new Schema<IAdmin>({
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
  isSuperAdmin: {
    type: Boolean,
    default: false
  }
})

export const Admin = Account.discriminator<IAdmin>('Admin', adminSchema)
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IAccount, AccountType } from "../interfaces";
import validator from "validator";

const accountSchema: Schema = new Schema<IAccount>({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Kindly provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  accountType: {
    type: String,
    enum: ['user','admin'] as AccountType[],
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  passwordChangedAt: Date,
  passwordResetExpires: Date,
  passwordResetToken: String,
},{
  timestamps: true,
  discriminatorKey: 'accountType'
})

//Indexes
accountSchema.index({ email: 1}, {unique: true});
accountSchema.index({ accountType: 1 });

// Hash password before saving
accountSchema.pre('save', async function() {
  if(!this.isModified('password')) return 
  try {
    const password:any = this.password
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(password, salt);
  } catch (error) {
    throw error
  }
})

// 
accountSchema.pre('save', function() {
  if(!this.isModified('password') || this.isNew) return 

  this.passwordChangedAt = new Date(Date.now() - 1000);
})

export const Account = mongoose.model<IAccount>('Account', accountSchema);
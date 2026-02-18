import { Document, Types } from "mongoose";

export interface IAccount {
  _id: Types.ObjectId;
  email: string;
  password: string;
  accountType: AccountType;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
  createPasswordResetToken(): string;
}

export enum AccountType {
  User = "user",
  Admin = "admin"
}
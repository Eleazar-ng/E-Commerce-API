import { Document, Types } from "mongoose";

export interface IAuthCode extends Document {
  email: string;
  code: string;
  type: 'email_verification' | 'password_reset';
  expiresAt: Date;
  attempts: number;
  used: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type AuthCodeType = 'email_verification' | 'password_reset';
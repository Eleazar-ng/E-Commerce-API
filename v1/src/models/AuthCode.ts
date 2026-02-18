import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from "bcryptjs";
import { IAuthCode, AuthCodeType } from '../interfaces';


const authCodeSchema = new Schema<IAuthCode>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    code: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['email_verification', 'password_reset'] as AuthCodeType[],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      // index: { expires: '10m' }, // Auto delete after 10 minutes
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
authCodeSchema.index({ email: 1, type: 1 });
authCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static methods
authCodeSchema.statics.generateCode = function (): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hash code before saving
authCodeSchema.pre('save', async function() {
  if(!this.isModified('code')) return 
  try {
    const code:any = this.code
    const salt = await bcrypt.genSalt(10);
    this.code = await bcrypt.hash(code, salt);
  } catch (error) {
    throw error
  }
})

export interface AuthCodeModel extends Model<IAuthCode> {
  generateCode(): string;
}

export const AuthCode = mongoose.model<IAuthCode, AuthCodeModel>('AuthCode', authCodeSchema);
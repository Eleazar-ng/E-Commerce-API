import { IAccount } from "./account.interface";

export interface IUser extends IAccount {
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
  dateOfBirth?: Date;
  preferences: {
    newsletter: boolean
    notifications: boolean
  }
}
import { IAccount } from "./account.interface";

export interface IAdmin extends IAccount {
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
}
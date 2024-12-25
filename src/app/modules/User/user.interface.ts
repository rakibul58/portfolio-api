import { Model } from 'mongoose';

export interface IUser {
  user: string;
  password: string;
  role: string;
}

export interface IUserMethods {
  isPasswordMatched(givenPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods> & IUserMethods;
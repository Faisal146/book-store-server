/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  profileImg?: string | null;
  cart?: {
    item: string;
    quantity: number;
  }[];
  isBlocked: boolean;
}

export interface UserStaticModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isEmailExists(email: string): Promise<TUser | null>;
}

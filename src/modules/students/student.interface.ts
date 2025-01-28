import { Models } from 'mongoose';
import { Schema, model, connect, Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;

  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type LocalGuardian = {
  name: string;
  Occupation: string;
  contact: string;
  address: string;
};

export type UserName = {
  first: string;
  middle: string;
  last: string;
};

export type TStudent = {
  id: string;
  name: UserName;

  gender: 'male' | 'female' | 'other';
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  avatar?: string;
  isActive: 'active' | 'inactive';
};

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModels = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;

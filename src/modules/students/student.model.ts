import { Schema, model, connect } from 'mongoose';
import validator from 'validator';

import {
  Guardian,
  LocalGuardian,
  TStudent as TStudent,
  StudentMethods,
  StudentModels,
  UserName,
} from './student.interface';

// 2. Create a Schema corresponding to the document interface.

const UserNameSchema = new Schema<UserName>({
  first: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: 'First name must be capitalized',
    },
  },
  middle: { type: String },
  last: { type: String, required: true },
});

const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContact: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  Occupation: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent, StudentModels, StudentMethods>({
  id: { type: String, required: true, unique: true },
  name: UserNameSchema,
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        '{VALUE} is not valid gender. Gender must be male, female or other',
    },
    required: [true, 'Gender is required'],
  },

  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  parmanentAddress: { type: String, required: true },
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
});

// 3. Create a Model.

// const User = model<IUser>('User', userSchema);

StudentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

export const Student = model<TStudent, StudentModels>('Student', StudentSchema);

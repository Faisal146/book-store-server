import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import config from '../../app/config';

import {
  Guardian,
  LocalGuardian,
  TStudent as TStudent,
  // StudentModels,
  UserName,
  StudentStaticModel,
} from './student.interface';
import bcrypt from 'bcrypt';

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

const StudentSchema = new Schema<TStudent, StudentStaticModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
  },
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
  isActive: { type: String, default: 'active' },
  isDeleted: { type: Boolean, default: false },
});

// 3. Create a Model.

// const User = model<IUser>('User', userSchema);

// pre middleware / hook
// password hash before saving

StudentSchema.pre('save', async function (next) {
  console.log('we will save the data');

  const user = this;
  console.log(user.password);

  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));

  next();
});

// post middleware/ hook

StudentSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'we have saved the data');

  next();
});

// Query Middleware

StudentSchema;

// creating custom static methods

StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating custom instance methods

// StudentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentStaticModel>(
  'Student',
  StudentSchema,
);

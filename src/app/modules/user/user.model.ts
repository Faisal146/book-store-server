import mongoose, { model } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TUser, UserStaticModel } from './user.interface';

const userSchema = new mongoose.Schema<TUser, UserStaticModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // encrypting password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds));

  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
userSchema.statics.isEmailExists = async function (email) {
  return await User.findOne({ email });
};

export const User = model<TUser, UserStaticModel>('User', userSchema);

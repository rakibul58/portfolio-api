import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, {}, IUserMethods>(
  {
    user: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it's modified
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, this.password);
};

export const User = model<IUser, UserModel>('User', userSchema);

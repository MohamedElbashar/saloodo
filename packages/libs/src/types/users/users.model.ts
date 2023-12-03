import mongoose from 'mongoose';
import { type IUser } from './users.interface';
const usersSchema = new mongoose.Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    userName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: 'users',
  }
);

export const Users = mongoose.model<IUser>('users', usersSchema);

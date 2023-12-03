import mongoose from 'mongoose';
import { IAuthCode } from './authCode.inteface';
import { ObjectId } from 'bson';

const authCodeSchema = new mongoose.Schema<IAuthCode>(
  {
    code: { type: String, required: true },
    expiredDate: { type: Date, required: true },
    userId: { type: ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'authCode' }
);

export const AuthCode = mongoose.model<IAuthCode>('authCode', authCodeSchema);

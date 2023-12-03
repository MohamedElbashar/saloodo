import mongoose from 'mongoose';
import { IToken } from './token.interface';
import { ObjectId } from 'bson';

const tokenSchema = new mongoose.Schema<IToken>(
  {
    accessToken: { type: String, required: true },
    userId: { type: ObjectId, required: true },
    expiredDate: { type: Date, required: true },
    refreshToken: { type: String, required: true },
    refreshTokenExpiredDate: { type: Date, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: 'token',
  }
);

export const Token = mongoose.model<IToken>('token', tokenSchema);

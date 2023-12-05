import mongoose, { Schema } from 'mongoose';
import { ISender } from './sender.interface';

const SenderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export const Sender = mongoose.model<ISender>('Sender', SenderSchema);

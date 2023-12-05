import mongoose, { Schema } from 'mongoose';
import { IBiker } from './biker.interface';

const BikerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Biker = mongoose.model<IBiker>('Biker', BikerSchema);

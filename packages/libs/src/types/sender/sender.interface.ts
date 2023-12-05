import { Document } from 'mongoose';

export interface ISender extends Document {
  name: string;
  email: string;
  password: string;
}

import { Schema } from 'mongoose';

export interface IParcel extends Document {
  senderId: Schema.Types.ObjectId;
  bikerId: Schema.Types.ObjectId;
  pickupAddress: string;
  dropOffAddress: string;
  status: string;
  pickupTimestamp: Date;
  deliveryTimestamp: Date;
}

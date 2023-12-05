import mongoose, { Schema } from 'mongoose';
import { IParcel } from './parcel.interface';

const ParcelSchema: Schema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'Sender', required: true },
  bikerId: { type: Schema.Types.ObjectId, ref: 'Biker' },
  pickupAddress: { type: String, required: true },
  dropOffAddress: { type: String, required: true },
  status: { type: String, required: true, default: 'Not Picked' },
  pickupTimestamp: { type: Date },
  deliveryTimestamp: { type: Date },
});
export const Parcel = mongoose.model<IParcel>('Parcel', ParcelSchema);

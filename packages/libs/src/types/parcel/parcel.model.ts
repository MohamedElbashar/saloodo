import mongoose, { Schema } from 'mongoose';
import { IParcel } from './parcel.interface';

enum ParcelStatus {
  NOTPICKED = 'NOTPICKED',
  PICKED = 'PICKED',
  DELIVERED = 'DELIVERED',
}
const ParcelSchema: Schema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bikerId: { type: Schema.Types.ObjectId, ref: 'User' },
  pickupAddress: { type: String, required: true },
  dropOffAddress: { type: String, required: true },
  status: {
    type: String,
    required: true,
    default: ParcelStatus.NOTPICKED,
    enum: Object.values(ParcelStatus),
  },
  pickupTimestamp: { type: Date },
  deliveryTimestamp: { type: Date },
});
export const Parcels = mongoose.model<IParcel>('Parcel', ParcelSchema);

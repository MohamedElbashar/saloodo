import { Schema } from 'mongoose';
import { BaseProps } from '../base';

export interface IParcel extends BaseProps {
  senderId: Schema.Types.ObjectId;
  bikerId: Schema.Types.ObjectId;
  pickupAddress: string;
  dropOffAddress: string;
  status: string;
  pickupTimestamp: Date;
  deliveryTimestamp: Date;
}

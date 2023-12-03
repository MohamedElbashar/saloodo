import type { ObjectId } from 'bson';
import { BaseProps } from '../base';

export interface IAuthCode extends BaseProps {
  code: string;
  expiredDate: Date;
  userId: ObjectId;
}

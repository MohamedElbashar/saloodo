import type { ObjectId } from 'bson';
import { BaseProps } from '../base';

export interface IToken extends BaseProps {
  accessToken: string;
  userId: ObjectId;
  expiredDate: Date;
  refreshToken: string;
  refreshTokenExpiredDate: Date;
}

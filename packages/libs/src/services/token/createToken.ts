import { ObjectId } from 'bson';
import { IToken, Omit_id, Token, Users } from '../../types';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

export async function createToken(
  userId: ObjectId | string
): Promise<IToken | null> {
  const user = await Users.findOne({ _id: userId });
  if (!user) {
    throw new Error('User Not found ');
  }

  const token: Omit_id<IToken> = {
    accessToken: 't' + randomUUID(),
    createdAt: new Date(),
    expiredDate: dayjs().add(15, 'minutes').toDate(),
    refreshToken: 'r' + randomUUID(),
    refreshTokenExpiredDate: dayjs().add(7, 'days').toDate(),
    updatedAt: new Date(),
    userId: user?._id || new ObjectId(),
  };

  const ret = await Token.create(token);
  return ret;
}

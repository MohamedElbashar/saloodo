import { ObjectId } from 'bson';
import { IToken, Token } from '../../types';
import dayjs from 'dayjs';

export async function verifyToken(
  accessToken: ObjectId | string
): Promise<IToken | undefined> {
  const token = await Token.findOne({ accessToken: accessToken });

  if (!token || !token.expiredDate || dayjs().isAfter(token.expiredDate)) {
    return undefined;
  }

  return token;
}

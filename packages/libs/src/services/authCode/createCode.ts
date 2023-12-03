import { ObjectId } from 'bson';
import { IAuthCode, AuthCode } from '../../types/authenticationCode';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

export async function createAuthCode(
  userId: string | ObjectId
): Promise<IAuthCode> {
  const code = randomUUID();
  const codeExpiredAt = dayjs().add(40, 'seconds').toDate();

  const authCode: Omit<IAuthCode, '_id'> = {
    code: 'c' + code,
    expiredDate: codeExpiredAt,
    userId: userId instanceof ObjectId ? userId : new ObjectId(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return await AuthCode.create(authCode);
}

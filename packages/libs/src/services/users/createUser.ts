import { IAuthCode } from 'src/types/authenticationCode';
import { OmitBaseProps, Omit_id } from '../../types';
import { IUser, Users } from '../../types';
import { createAuthCode } from '../authCode';

export async function createdUser(
  data: OmitBaseProps<IUser>
): Promise<IAuthCode> {
  const newUser = {
    userName: data.userName,
    password: data.password,
    email: data.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Omit_id<IUser>;

  const result = await Users.create(newUser);
  return await createAuthCode(result._id);
}

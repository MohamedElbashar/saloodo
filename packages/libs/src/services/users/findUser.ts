import { Filter, IUser, Users } from '../../types';

export async function findUser(filter: Filter): Promise<IUser | null> {
  const user = await Users.findOne(filter);
  return user;
}

import { Token } from '../../types';

export async function deleteAccessToken(
  accessToken: string
): Promise<void | null> {
  await Token.deleteOne({ accessToken });
}

import { Token } from '../../types';

export async function deleteRefreshToken(
  refreshToken: string
): Promise<void | null> {
  await Token.deleteOne({ refreshToken });
}

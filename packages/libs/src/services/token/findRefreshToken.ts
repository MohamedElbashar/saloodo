import { IToken, Token } from '../../types';

export async function findRefreshToken(
  refreshToken: string
): Promise<IToken | null> {
  const token = await Token.findOne({
    refreshToken: refreshToken,
  });
  return token;
}

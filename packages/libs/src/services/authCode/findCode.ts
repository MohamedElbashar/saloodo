import { IAuthCode, AuthCode } from '../../types/authenticationCode';

export async function fineCode(code: string): Promise<IAuthCode | null> {
  const ret = await AuthCode.findOne({ code });
  return ret;
}

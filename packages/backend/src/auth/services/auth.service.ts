import { authCode, token, users } from '@saloodo/saloodo-database';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { AuthCode, AuthenticateDTO, TokenDto } from '../dto';
import { CreateUserDTO } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  async signUp({
    email,
    password,
    userName,
  }: CreateUserDTO): Promise<AuthCode> {
    const currentEmail = email.toLowerCase();
    const user = await users.findUser({ email: currentEmail });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser: CreateUserDTO = {
      email,
      password: hashedPassword,
      userName,
    };
    const createdUser = await users.createdUser(newUser);

    return {
      code: createdUser.code,
    };
  }

  async authenticate({
    email,
    password,
  }: AuthenticateDTO): Promise<AuthCode | null> {
    const user = await users.findUser({ email });
    if (!user) {
      throw new HttpException(
        'Invalid email or password. Please try again with the correct credentials.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password. Please try again with the correct credentials.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const authCodeResult = await authCode.createAuthCode(user._id);
    return {
      code: authCodeResult.code,
    };
  }

  async exchangeCodeWithToken({ code }: AuthCode): Promise<TokenDto> {
    const codeResult = await authCode.fineCode(code);
    if (!codeResult) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }

    if (
      !codeResult ||
      !codeResult.expiredDate ||
      dayjs().isAfter(codeResult.expiredDate)
    ) {
      throw new HttpException('Code expired', HttpStatus.NOT_FOUND);
    }

    const tokenResult = await token.createToken(codeResult.userId);
    return {
      token: tokenResult.accessToken,
      refreshToken: tokenResult.refreshToken,
      expiredAt: tokenResult.expiredDate,
    };
  }

  async refreshToken({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<TokenDto> {
    const refreshTokenResult = await token.findRefreshToken(refreshToken);
    if (
      !token ||
      !refreshTokenResult.refreshTokenExpiredDate ||
      dayjs().isAfter(refreshTokenResult.refreshTokenExpiredDate)
    ) {
      throw new HttpException('Not valid RefreshToken', HttpStatus.NOT_FOUND);
    }

    const newToken = await token.createToken(refreshTokenResult.userId);
    await token.deleteAccessToken(refreshTokenResult.accessToken);
    return {
      token: newToken.accessToken,
      refreshToken: newToken.refreshToken,
      expiredAt: newToken.expiredDate,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ required: true })
  readonly password: string;
}

export class TokenDto {
  @ApiProperty()
  @IsString()
  readonly token: string;
  @ApiProperty()
  @IsString()
  readonly refreshToken: string;
  @ApiProperty({ type: Date })
  @IsDate()
  readonly expiredAt: Date;
}

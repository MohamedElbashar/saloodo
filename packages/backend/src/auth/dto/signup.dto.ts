import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, Validate } from 'class-validator';

function isValidPassword(value: string): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;
  return regex.test(value);
}

export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Validate(isValidPassword, {
    message:
      'Password must contain at least 1 letter, 1 number, and 1 special character',
  })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  userName: string;
}

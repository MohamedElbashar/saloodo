import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UUIDObj {
  @ApiProperty({ required: true })
  uuid: string;
}

export class AuthCode {
  @ApiProperty()
  @IsString()
  code: string;
}

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthCode, AuthenticateDTO, RefreshTokenDTO, TokenDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { CreateUserDTO } from '../dto/signup.dto';

@Controller('auth')
@ApiTags('OAuth')
export class AuthController {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @Post('OAuth')
  @ApiBody({ type: AuthenticateDTO })
  @ApiResponse({ type: AuthCode })
  @HttpCode(HttpStatus.OK)
  async OAuth(@Body() authenticateDto: AuthenticateDTO): Promise<AuthCode> {
    return this.authService.authenticate(authenticateDto);
  }

  @Post('authenticate')
  @ApiBody({ type: AuthCode })
  @ApiResponse({ type: TokenDto })
  @HttpCode(HttpStatus.OK)
  authenticate(@Body() authCodeDto: AuthCode): Promise<TokenDto> {
    return this.authService.exchangeCodeWithToken(authCodeDto);
  }

  @Post('refreshToken')
  @ApiBody({ type: RefreshTokenDTO })
  @ApiResponse({ type: TokenDto })
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDTO): Promise<TokenDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post('signup')
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({ type: AuthCode })
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDTO): Promise<AuthCode> {
    return await this.authService.signUp(createUserDto);
  }
}

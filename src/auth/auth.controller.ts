import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { SignupDto } from './dto/signup.dto';
import type { LoginDto } from './dto/login.dto';
import type { RefreshTokenDto } from './dto/refresh-tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: POST /auth/register ------> Signup
  @Post('signup') //auth/signup
  async signup(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  //TODO: POST /auth/login ------> Signin
  @Post('login') //auth/login
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }
 
  //TODO: POST Refresh Token 
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }
}

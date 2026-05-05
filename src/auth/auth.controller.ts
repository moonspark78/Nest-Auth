import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { SignupDto } from './dto/signup.dto';

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
  async login() {}

  //TODO: POST Refresh Token 

}

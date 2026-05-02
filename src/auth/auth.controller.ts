import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: POST /auth/register ------> Signup
  @Post('signup') //auth/signup
  async signup(@Body() signupData: SignupDto) {}

  //TODO: POST /auth/login ------> Signin

  //TODO: POST Refresh Token 

}

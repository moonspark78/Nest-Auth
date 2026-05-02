import { Injectable } from '@nestjs/common';
import type { SignupDto } from './dto/signup.dto';
import { useContainer } from '../../node_modules/class-validator/esm2015/container';


@Injectable()
export class AuthService {
  async signup(signupData: SignupDto) {
    //TODO: Check if email is in useContainer
    //TODO: Hash the password
    //TODO: Create the user in the database
  }
}

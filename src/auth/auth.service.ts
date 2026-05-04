import { Injectable } from '@nestjs/common';
import type { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { User } from '../schemas/user.schema';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async signup(signupData: SignupDto) {
    //TODO: Check if email is in useContainer
    //TODO: Hash the password
    //TODO: Create the user in the database
  }
}

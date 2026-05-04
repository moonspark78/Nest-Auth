import { BadRequestException, Injectable } from '@nestjs/common';
import  { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async signup(signupData: SignupDto) {
    const { email, password, name } = signupData;
    //TODO: Check if email is in use
    const emailInUse = await this.UserModel.findOne({ 
      email,
    });
    if (emailInUse) {
      throw new BadRequestException('Email is already in use');
    }
    //TODO: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //TODO: Create the user in the database
    await this.UserModel.create({
      name,
      email,
    });
  }
}

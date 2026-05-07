import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import  { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import type { LoginDto } from './dto/login.dto';
import type { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>,
  private jwtService: JwtService
) {}
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
      password: hashedPassword,
    });
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    //Find if user exists by email
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //TODO: Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //TODO: Generate JWT token and return it
      return {
        message: 'Login successful',
      };
  }

  async generateUserToken(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    return accessToken;
  }
}

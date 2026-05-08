import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import  { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>, 
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
      return this.generateUserToken(user._id);
  }

  async generateUserToken(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4(); 
    return {
      accessToken,
      refreshToken
    };
  }

  async storeRefreshToken(userId, token: string) {
    //Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
  }
}


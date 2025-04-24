import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDtoType } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { responseWrapper } from 'src/utils/wrapper';
import { TApiResponse } from 'src/public/public.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: loginDtoType): Promise<TApiResponse> {
    const cUser = await this.userService.findByEmail(loginDto.email);

    // Check if user exists
    if (!cUser) {
      throw new UnauthorizedException('User not found');
    }

    // Validate password
    if (!loginDto.password || !cUser.password) {
      throw new UnauthorizedException('Password is required');
    }

    const checkPw = await bcrypt.compare(loginDto.password, cUser.password);

    if (!checkPw) {
      throw new UnauthorizedException('Password wrong');
    }

    const token = await this.jwtService.signAsync({
      id: cUser.id,
      email: cUser.email,
      role: cUser.role, // add role in token for check user role
    });

    return responseWrapper(token, 'success login');
  }
}

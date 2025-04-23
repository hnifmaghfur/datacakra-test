import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, loginDtoType } from './dto/login.dto';
import { Public } from 'src/public/public.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() payload: loginDtoType) {
    const validData = loginDto.safeParse(payload);
    if (!validData.success) {
      throw new BadRequestException('Invalid input data');
    }

    return this.authService.login(validData.data);
  }
}

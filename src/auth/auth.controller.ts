import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, TLoginDto } from './dto/login.dto';
import { Public } from 'src/public/public.decorator';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { TApiResponse } from 'src/public/public.dto';

@Controller('auth')
@UsePipes(ZodValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiCreatedResponse({
    type: TApiResponse,
    description: 'Token inside data',
  })
  async login(@Body() payload: TLoginDto): Promise<TApiResponse> {
    const validData = loginDto.safeParse(payload);
    if (!validData.success) {
      throw new BadRequestException('Invalid input data');
    }

    return this.authService.login(validData.data);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { responseWrapper } from 'src/utils/wrapper';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/auth.decorator';
import { DataToken } from 'src/auth/dto/token.dto';
import { UserGuard } from './user.guard';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() payload: CreateUserDto) {
    // validate data
    const validPayload = createUserDto.safeParse(payload);
    if (!validPayload.success) {
      throw new BadRequestException('invalid data');
    }

    await this.userService.create(validPayload.data);
    return responseWrapper(true, 'success create data');
  }

  @UseGuards(AuthGuard, new UserGuard('admin'))
  @Get()
  async findAll(@Auth() data: DataToken) {
    return await this.userService.findAll(data);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

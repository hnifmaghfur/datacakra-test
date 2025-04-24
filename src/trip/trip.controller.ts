import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { TripService } from './trip.service';
import {
  CreateTripDto,
  validTripDto,
  validUpdateTripDto,
} from './dto/trip.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserGuard } from 'src/user/user.guard';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { TApiResponse } from 'src/public/public.dto';
import { Auth } from 'src/auth/auth.decorator';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { DataToken } from 'src/auth/dto/token.dto';

@Controller('trip')
@UsePipes(ZodValidationPipe)
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(AuthGuard, new UserGuard('admin'))
  @Post()
  @ApiCreatedResponse({
    type: TApiResponse,
  })
  create(
    @Auth() dataAdmin: DataToken, // get email admin for createby data
    @Body() body: CreateTripDto,
  ): Promise<TApiResponse> {
    // validate data input
    const validData = validTripDto.safeParse({
      createdBy: dataAdmin.email,
      ...body,
    });
    if (!validData.success) {
      throw new BadRequestException('Invalid input data');
    }
    return this.tripService.create(validData.data);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiCreatedResponse({
    type: TApiResponse,
  })
  findAll(@Auth() user: DataToken): Promise<TApiResponse> {
    return this.tripService.findAll(user);
  }

  @UseGuards(AuthGuard, new UserGuard('admin'))
  @Patch(':id')
  @ApiCreatedResponse({
    type: TApiResponse,
  })
  update(
    @Auth() authData: DataToken,
    @Param('id') id: string,
    @Body() updateTripDto: CreateTripDto,
  ): Promise<TApiResponse> {
    const validData = validUpdateTripDto.safeParse({
      id: Number(id),
      ...updateTripDto,
      createdBy: authData.email,
    });
    if (!validData.success) {
      throw new BadRequestException('Input data Invalid');
    }
    return this.tripService.update(validData.data);
  }

  @UseGuards(AuthGuard, new UserGuard('admin'))
  @Patch(':id/delete')
  remove(@Auth() authData: DataToken, @Param('id') id: string) {
    return this.tripService.remove(+id, authData);
  }
}

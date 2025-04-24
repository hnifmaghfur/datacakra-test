import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ValidTripDto, ValidUpdateTripDto } from './dto/trip.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { Repository, FindManyOptions } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { TApiResponse } from 'src/public/public.dto';
import { responseWrapper } from 'src/utils/wrapper';
import { DataToken } from 'src/auth/dto/token.dto';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
    private readonly userService: UserService,
  ) {}
  async create(payload: ValidTripDto): Promise<TApiResponse> {
    // validate admin create trip
    await this.userService.findByEmail(payload.createdBy);

    // get email and remove email from pInsert
    const { email, ...pInsert } = payload;

    // validate & get data tenant
    const getTenant = await this.userService.findByEmail(email);

    // validate if startDate more than endDate
    if (pInsert.startDate > pInsert.endDate) {
      throw new BadRequestException('Wrong input data in date');
    }

    const dInsert = { user: getTenant, ...pInsert };

    const dataTrip = await this.tripRepo.save(dInsert);
    return responseWrapper({ id: dataTrip.id }, 'Success insert data Trip');
  }

  async findAll(payload: DataToken): Promise<TApiResponse> {
    let query: FindManyOptions<Trip> = {
      order: { endDate: 'DESC' },
    };
    // condition for role user access trip
    if (payload.role !== 'admin') {
      query = {
        ...query,
        where: {
          user: {
            id: payload.id,
          },
        },
      };
    }
    return responseWrapper(
      await this.tripRepo.find(query),
      'Success get All Trip',
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} trip`;
  }

  async update(payload: ValidUpdateTripDto): Promise<TApiResponse> {
    const checkTrip = await this.tripRepo.findOne({
      where: { id: payload.id },
    });
    if (!checkTrip) {
      throw new NotFoundException('Data Not Found');
    }

    // validate if startDate more than endDate
    if (payload.startDate > payload.endDate) {
      throw new BadRequestException('Wrong input data in date');
    }

    // check admin input and tenant is valid
    await this.userService.findByEmail(payload.email);
    await this.userService.findByEmail(payload.createdBy);

    // update query
    await this.tripRepo.save(payload);
    return responseWrapper({ id: payload.id }, 'Success update trip');
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}

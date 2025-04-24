import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateUserDto,
  InsertUserDto,
  UpdateUserDto,
  UserShowData,
} from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DataToken } from 'src/auth/dto/token.dto';
import { responseWrapper } from 'src/utils/wrapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(payload: CreateUserDto) {
    // encrypt password
    const encPassword: string = await bcrypt.hash('trial', 5);

    const data: InsertUserDto = { ...payload, password: encPassword };

    // insert data
    return await this.userRepo.save(data);
  }

  async findAll(payload: DataToken): Promise<UserShowData[]> {
    return await this.userRepo.find({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
      where: {
        email: Not(payload.email),
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const data = await this.userRepo.findOneBy({ email });
    if (!data) {
      throw new NotFoundException('user not found');
    }
    return data;
  }

  async update(payload: UpdateUserDto) {
    //validate user data is exist
    const data = await this.userRepo.findOne({ where: { id: payload.id } });
    if (!data) {
      throw new NotFoundException('user not found');
    }

    // validate email is already used
    const cEmail = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    if (cEmail && cEmail.email !== data.email) {
      throw new BadRequestException('you cannot use this email.');
    }

    return await this.userRepo.save(payload);
  }

  async remove(id: number) {
    const cUser = await this.userRepo.findOne({ where: { id } });
    if (!cUser) {
      throw new NotFoundException('user not found');
    }

    if (cUser.role === 'admin') {
      throw new BadRequestException(
        'You cannot delete admin, please change role first',
      );
    }

    // query delete user
    await this.userRepo.delete(id);
    return responseWrapper('', `This action removes a #${id} user`);
  }
}

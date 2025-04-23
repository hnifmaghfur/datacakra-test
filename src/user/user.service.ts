import { Injectable, NotFoundException } from '@nestjs/common';
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
      },
      where: {
        email: Not(payload.email),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string): Promise<User> {
    const data = await this.userRepo.findOneBy({ email });
    if (!data) {
      throw new NotFoundException('user not found');
    }
    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} ${updateUserDto.name} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserModel } from './user.model';
import { DbService } from '../db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const db = await this.dbService.getDb();
    const newUser: UserModel = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<UserModel[]> {
    const db = await this.dbService.getDb();
    return db.users;
  }

  async findOne(id: string): Promise<UserModel> {
    const db = await this.dbService.getDb();
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserModel> {
    const user = await this.findOne(id);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }
    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  async remove(id: string): Promise<void> {
    const db = await this.dbService.getDb();
    const index = db.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    db.users.splice(index, 1);
  }
}

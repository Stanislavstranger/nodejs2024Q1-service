import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.id = uuidv4();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.version = 1;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.findOne(id);
    if (user.password === updatePasswordDto.oldPassword) {
      user.password = updatePasswordDto.newPassword;
      user.version++;
      user.updatedAt = new Date();
      return await this.userRepository.save(user);
    } else {
      throw new ForbiddenException('Old password is incorrect');
    }
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return true;
  }
}

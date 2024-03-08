import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
  HttpStatus,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { isUUID } from 'class-validator';
import { NOT_FOUND_USER_ERROR } from './user.constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return newUser.login;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(200)
  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId');
    }
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  @HttpCode(200)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId');
    }
    try {
      const updatedUser = await this.userService.update(id, updatePasswordDto);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid userId');
    }
    const deleted = await this.userService.remove(id);
    if (!deleted) throw new NotFoundException(NOT_FOUND_USER_ERROR);
    return { statusCode: HttpStatus.NO_CONTENT };
  }
}

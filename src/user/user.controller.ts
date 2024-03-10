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
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from './user.service';
import { NOT_FOUND_USER_ERROR } from './user.constants';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.userService.create(createUserDto);

      if (newUser === undefined) {
        throw new NotFoundException(NOT_FOUND_USER_ERROR);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userResponse } = newUser;

      res.status(HttpStatus.CREATED).send(userResponse);
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
  @UsePipes(new ValidationPipe())
  @Get(':id')
  async findOne(@Param('id', IdValidationPipe) id: string) {
    try {
      const user = await this.userService.findOne(id);
      if (user === undefined) {
        throw new NotFoundException(NOT_FOUND_USER_ERROR);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(NOT_FOUND_USER_ERROR);
    }
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const updatedUser = await this.userService.update(id, updatePasswordDto);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userResponse } = updatedUser;
      return userResponse;
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

  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async remove(
    @Param('id', IdValidationPipe) id: string,
    @Res() res: Response,
  ) {
    const deleted = await this.userService.remove(id);
    if (!deleted) throw new NotFoundException(NOT_FOUND_USER_ERROR);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}

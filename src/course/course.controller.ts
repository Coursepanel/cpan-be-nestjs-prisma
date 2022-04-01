import { UserService } from './course.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './course.entity';
import { CreateUserDto } from './dto/create-course.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<void> {
    return await this.userService.createUser(user.name, user.rollNumber);
  }
}

import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from './entities/user.entity';
import { TargetUserGuard } from './guards/target-user.guard';
import { TargetUser } from './decorators/target-user.decorator';
import { CreateUserDto } from './models/create-user.dto';

@Controller('users/:userId')
export class UsersController {
  //private val=new Validator();
  constructor(private usersService: UsersService) {}

  @UseGuards(TargetUserGuard)
  @Get()
  async getProfile(@AuthUser() user: User, @TargetUser() targetUser: User) {
    return targetUser;
  }

  @UseGuards(TargetUserGuard)
  @Get('providers')
  async getProviders(@AuthUser() user: User) {
    return this.usersService.getProviders({ id: user.id });
  }

  @UseGuards(TargetUserGuard)
  @Get('orders')
  async getOrders(@TargetUser() user: User) {
    return this.usersService.getOrders(user);
  }

  //Things to Figure out...
  //Do I need to create a validation pipe to convert CreateUserDto to User object?
  //Do I send all paramaters through query?
  //What folder should I store a pipe if I need to create one?
  //Should this @Post function go in a seperate file?
  @Post()
  async create(@Body(new ValidationPipe()) userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(TargetUserGuard)
  @Get('savings')
  async getSavings(@TargetUser() user: User) {
    return this.usersService.getSavings(user);
  }
}

import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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

  @Post()
  async create(@Body(new ValidationPipe({transform:true})) createUserDto: CreateUserDto) {
    console.log("test"+ createUserDto.email);
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(TargetUserGuard)
  @Get('savings')
  async getSavings(@TargetUser() user: User) {
    return this.usersService.getSavings(user);
  }
}

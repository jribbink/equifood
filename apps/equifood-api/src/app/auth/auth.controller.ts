import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthRoute } from './decorators/auth-route.decorator';
import { AuthUser } from './decorators/auth-user.decorator';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/models/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Post('link')
  @AuthRoute()
  async linkSocial(
    @AuthUser() user: User,
    @Body('socialJwt') socialJwt: string
  ) {
    return this.authService.linkSocial(
      user,
      await this.authService.validateSocialJwt(socialJwt)
    );
  }

  // Sign in using POST strategy, link account if JWT provided
  @UseGuards(DynamicAuthGuard((req) => req.params.strategy))
  @Post(':strategy')
  async loginPost(@Request() req: any) {
    // Create and return JWT auth
    return req.socialJwt || (await this.authService.login(req.user));
  }

  @Post()
  async create(@Body(new ValidationPipe({transform:true})) createUserDto: CreateUserDto) {
    console.log("test"+ createUserDto.email);
    const user= await this.usersService.createUser(createUserDto);
    const jwt=await this.authService.login(user);
    return jwt;
  }

  // Sign in using GET strategy, link account if JWT provided
  @Get(':strategy')
  @UseGuards(DynamicAuthGuard((req) => req.params.strategy))
  async loginGet(@Request() req: any, @Response() res: any) {
    const jwt = req.socialJwt || (await this.authService.login(req.user));
    const redirectURL = new URL(req.cookies.redirect_uri);
    redirectURL.searchParams.set('jwt', jwt);
    res.redirect(redirectURL.href);
  }
}

import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';

export class UserGuard implements CanActivate {
  jwtGuard = new JwtAuthGuard();

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // verify is authorized & add user to request
    if (!(await this.jwtGuard.canActivate(context))) return false;

    const req = context.switchToHttp().getRequest();
    const { user } = req;

    if (req.params.userId == 'self') {
      req.targetUser = user;
      return true;
    } else {
      req.targetUser = await this.userRepository.findOneBy({
        id: req.params.userId,
      });
    }

    if (!req.targetUser) return false;
    if ((req.user as User).roles.includes('admin')) return true;
    return (req.targetUser as User).id == (user as User).id;
  }
}

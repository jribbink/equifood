import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { resolveContext } from '../../common/utils/resolve-context';
import { User } from '../entities/user.entity';

export class TargetUserGuard implements CanActivate {
  jwtGuard = new JwtAuthGuard();

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // verify is authorized & add user to request
    if (!(await this.jwtGuard.canActivate(context))) return false;

    const req = resolveContext(context).request;
    const { user } = req;

    let targetUserId;
    switch (context.getType()) {
      case <any>'graphql':
        targetUserId =
          context.getArgs().find((o) => o?.targetUserId)?.targetUserId ??
          'self';
        break;
      case 'http':
        targetUserId = req.params.userId;
        break;
      default:
        throw new Error('Unsupported context');
    }

    if (targetUserId == 'self') {
      req.targetUser = user;
      return true;
    } else {
      req.targetUser = await this.userRepository.findOneBy({
        id: targetUserId,
      });
    }

    if (!req.targetUser) return false;
    if ((req.user as User).roles.includes('admin')) return true;
    return (req.targetUser as User).id == (user as User).id;
  }
}

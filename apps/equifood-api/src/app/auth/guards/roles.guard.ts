import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../../common/types/role.enum';

export function RolesGuard(...roles: Role[]) {
  return class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const { user } = context.switchToHttp().getRequest();
      return roles.some((role) => user.roles?.includes(role));
    }
  };
}

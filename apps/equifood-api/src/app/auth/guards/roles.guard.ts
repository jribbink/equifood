import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '../../common/types/role.enum';
import { resolveContext } from '../../common/utils/resolve-context';

export function RolesGuard(...roles: Role[]) {
  return class RolesGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const { user } = resolveContext(context).request;
      return roles.some((role) => user.roles?.includes(role));
    }
  };
}

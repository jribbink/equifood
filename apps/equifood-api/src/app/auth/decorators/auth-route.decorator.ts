import { CanActivate, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../../common/types/role.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function AuthRoute(...roles: Role[]) {
  return (
    target: any,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<any>
  ) => {
    const guards: (new () => CanActivate)[] = [JwtAuthGuard];
    if (roles.length > 0) guards.push(RolesGuard(...roles));
    UseGuards(...guards)(target, key, descriptor);
    roles.forEach((role) =>
      ApiBearerAuth(`JWT-${role}`)(target, key, descriptor)
    );
  };
}

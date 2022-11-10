import { UseGuards } from '@nestjs/common';
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
    UseGuards(JwtAuthGuard, RolesGuard(...roles))(target, key, descriptor);
    roles.forEach((role) =>
      ApiBearerAuth(`JWT-${role}`)(target, key, descriptor)
    );
  };
}

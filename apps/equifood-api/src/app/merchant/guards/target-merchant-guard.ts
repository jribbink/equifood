import { CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { resolveContext } from '../../common/utils/resolve-context';
import { User } from '../../users/entities/user.entity';
import { Merchant } from '../entities/merchant.entity';

/**
 * TargetMerchantGuard mixin to extract target merchant from params
 * MUST INCLUDE :merchantId in route params
 * @date 2023-03-06
 * @param {any} access "any"|"restricted" specifies whether user must have access to the merchant
 * @returns {any}
 */
export function TargetMerchantGuard(access: 'any' | 'restricted') {
  class TargetMerchantGuard implements CanActivate {
    jwtGuard = new JwtAuthGuard();

    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      @InjectRepository(Merchant)
      private merchantRepository: Repository<Merchant>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      // Append authorized user to request
      await this.jwtGuard.canActivate(context);

      const req = resolveContext(context).request;
      const user: User | undefined = req.user as User | undefined;

      let targetMerchantId;
      switch (context.getType()) {
        case <any>'graphql':
          targetMerchantId =
            context.getArgs().find((o) => o?.targetUserId)?.targetMerchantId ??
            'self';
          break;
        case 'http':
          targetMerchantId = req.params.merchantId;
          break;
        default:
          throw new Error('Unsupported context');
      }

      if (targetMerchantId == 'self') {
        const targetMerchant = await this.merchantRepository.findOneBy({
          user: { id: user?.id },
        });

        if (targetMerchant) {
          req.targetMerchant = targetMerchant;
          return true;
        }
      } else {
        req.targetMerchant = await this.merchantRepository.findOneBy({
          id: targetMerchantId,
        });
      }

      if (!req.targetMerhant) return false;
      if ((req.user as User).roles.includes('admin')) return true;
      return (
        access == 'any' || (req.targetMerchant as Merchant).user.id == user.id
      );
    }
  }
  return TargetMerchantGuard;
}

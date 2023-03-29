import { Inject, Injectable } from '@nestjs/common';
import { SUBSCRIPTIONS_MODULE_OPTIONS } from './constants';
import { SubscriptionsModuleOptions } from './interfaces/subscriptions-module-options';

@Injectable()
export class SubscriptionsConfigService {
  constructor(
    @Inject(SUBSCRIPTIONS_MODULE_OPTIONS)
    public config: SubscriptionsModuleOptions
  ) {}
}

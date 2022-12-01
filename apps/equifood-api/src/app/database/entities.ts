// This file is temporary until we solve how to get NestJS to resolve TypeORM entities automatically

import { AuthProvider } from '../auth/entities/auth-provider';
import { Item } from '../merchant/entities/item.entity';
import { Merchant } from '../merchant/entities/merchant.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderedItem } from '../orders/entities/ordered-item.entity';
import { Upload } from '../uploads/entities/upload.entity';
import { User } from '../users/entities/user.entity';

export default [User, Merchant, Upload, Order, Item, OrderedItem, AuthProvider];

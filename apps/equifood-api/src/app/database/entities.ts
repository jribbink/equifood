// This file is temporary until we solve how to get NestJS to resolve TypeORM entities automatically

import { Merchant } from '../merchant/entities/merchant.entity';
import { Upload } from '../uploads/entities/upload.entity';
import { User } from '../users/entities/user.entity';

export default [User, Merchant, Upload];

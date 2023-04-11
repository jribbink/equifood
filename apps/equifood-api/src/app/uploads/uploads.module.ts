import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  controllers: [UploadsController],
  imports: [TypeOrmModule.forFeature([Upload])],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}

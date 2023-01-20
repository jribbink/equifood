import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DataSourceService {
  constructor(@InjectDataSource() public dataSource: DataSource) {}
}

import { Institute } from './../institute/institute.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './department.controller';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
    TypeOrmModule.forFeature([Institute]),
  ],
  providers: [DepartmentService],
  controllers: [DepartmentController],
})
export class DepartmentModule {}

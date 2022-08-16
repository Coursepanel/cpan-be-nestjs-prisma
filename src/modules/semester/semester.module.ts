import { Institute } from '../institute/institute.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SemesterController } from './semester.controller';
import { Semester } from './semester.entity';
import { SemesterService } from './semester.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Semester]),
    TypeOrmModule.forFeature([Institute]),
  ],
  providers: [SemesterService],
  controllers: [SemesterController],
})
export class SemesterModule {}

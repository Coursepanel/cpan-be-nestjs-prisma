import { SemesterService } from './semester.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Semester } from './semester.entity';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { Institute } from '../institute/institute.entity';

@Controller('semesters')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}
  @Get()
  async findAll(): Promise<Semester[]> {
    return await this.semesterService.findAll();
  }
  @Get('/:semesterId')
  async findById(@Param() params): Promise<Semester> {
    return await this.semesterService.findOne(params.deptId);
  }
  @Get('/:semesterId/institute')
  async findDeptInsti(@Param() params): Promise<Institute> {
    return await this.semesterService.getDeptInstitute(params.deptId);
  }
  @Post()
  async createSemester(@Body() semester: CreateSemesterDto): Promise<void> {
    return await this.semesterService.createSemester(semester);
  }
}

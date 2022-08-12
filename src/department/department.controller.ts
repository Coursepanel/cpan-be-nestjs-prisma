import { DepartmentService } from './department.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Institute } from 'src/institute/institute.entity';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get()
  async findAll(): Promise<Department[]> {
    return await this.departmentService.findAll();
  }
  @Get('/:departmentId')
  async findById(@Param() params): Promise<Department> {
    return await this.departmentService.findOne(params.deptId);
  }
  @Get('/:departmentId/institute')
  async findDeptInsti(@Param() params): Promise<Institute> {
    return await this.departmentService.getDeptInstitute(params.deptId);
  }
  @Post()
  async createDepartment(
    @Body() department: CreateDepartmentDto,
  ): Promise<void> {
    return await this.departmentService.createDepartment(department);
  }
}

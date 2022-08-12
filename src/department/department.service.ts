import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institute } from 'src/institute/institute.entity';
import { MongoRepository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: MongoRepository<Department>,
    @InjectRepository(Institute)
    private readonly institutesRepository: MongoRepository<Institute>,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.departmentsRepository.find();
  }

  async getDeptInstitute(id: string): Promise<Institute> {
    const department = await this.departmentsRepository.findOneById(id);
    return await this.institutesRepository.findOneById(department.insti_id);
  }

  async findOne(id: string): Promise<Department> {
    console.log(id);
    return await this.departmentsRepository.findOneById(id);
  }

  async createDepartment(department: CreateDepartmentDto): Promise<void> {
    await this.departmentsRepository.save(department);
  }
}

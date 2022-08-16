import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Institute } from '../institute/institute.entity';
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
    return await this.departmentsRepository.findOneById(id);
  }

  async createDepartment(department: CreateDepartmentDto): Promise<void> {
    await this.departmentsRepository.save(department);
  }
}

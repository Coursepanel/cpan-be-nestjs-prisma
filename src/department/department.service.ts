import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly institutesRepository: MongoRepository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return await this.institutesRepository.find();
  }

  async findOne(id: string): Promise<Department> {
    return await this.institutesRepository.findOneBy({ id });
  }

  async createDepartment(institute: CreateDepartmentDto): Promise<void> {
    await this.institutesRepository.save(institute);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Institute } from './institute.entity';
import { CreateInstituteDto } from './dto/create-institute.dto';

@Injectable()
export class InstituteService {
  constructor(
    @InjectRepository(Institute)
    private readonly institutesRepository: MongoRepository<Institute>,
  ) {}

  async findAll(): Promise<Institute[]> {
    return await this.institutesRepository.find();
  }

  async findOne(id: string): Promise<Institute> {
    return await this.institutesRepository.findOneBy({ id });
  }

  async createInstitute(institute: CreateInstituteDto): Promise<void> {
    await this.institutesRepository.save(institute);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Semester } from './semester.entity';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { Institute } from '../institute/institute.entity';

@Injectable()
export class SemesterService {
  constructor(
    @InjectRepository(Semester)
    private readonly semestersRepository: MongoRepository<Semester>,
    @InjectRepository(Institute)
    private readonly institutesRepository: MongoRepository<Institute>,
  ) {}

  async findAll(): Promise<Semester[]> {
    return await this.semestersRepository.find();
  }

  async getDeptInstitute(id: string): Promise<Institute> {
    const semester = await this.semestersRepository.findOneById(id);
    return await this.institutesRepository.findOneById(semester.insti_id);
  }

  async findOne(id: string): Promise<Semester> {
    console.log(id);
    return await this.semestersRepository.findOneById(id);
  }

  async createSemester(semester: CreateSemesterDto): Promise<void> {
    await this.semestersRepository.save(semester);
  }
}

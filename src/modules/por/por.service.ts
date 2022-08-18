import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Por } from './por.entity';
import { CreatePorDto } from './dto/create-por.dto';

@Injectable()
export class PorService {
  constructor(
    @InjectRepository(Por)
    private readonly porsRepository: MongoRepository<Por>,
  ) {}

  async findAll(): Promise<Por[]> {
    return await this.porsRepository.find();
  }

  async findOne(id: string): Promise<Por> {
    return await this.porsRepository.findOneBy({ id });
  }

  // async remove(id: string): Promise<void> {
  //   await this.porsRepository.delete(id);
  // }

  async findByDept(deptCode: string): Promise<Por[]> {
    return await this.porsRepository.find({
      where: {
        deptCode: deptCode,
      },
    });
  }

  async createPor(por: CreatePorDto): Promise<void> {
    await this.porsRepository.save(por);
  }
}

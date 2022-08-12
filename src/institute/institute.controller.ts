import { InstituteService } from './institute.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Institute } from './institute.entity';
import { CreateInstituteDto } from './dto/create-institute.dto';

@Controller('institutes')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}
  @Get()
  async findAll(): Promise<Institute[]> {
    return await this.instituteService.findAll();
  }
  @Get('/:instituteId')
  async findById(@Param() params): Promise<Institute> {
    return await this.instituteService.findOne(params.instituteId);
  }
  @Post()
  async createInstitute(@Body() institute: CreateInstituteDto): Promise<void> {
    return await this.instituteService.createInstitute(institute);
  }
}

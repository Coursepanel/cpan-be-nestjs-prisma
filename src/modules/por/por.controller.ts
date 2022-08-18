import { PorService } from './por.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Por } from './por.entity';
import { CreatePorDto } from './dto/create-por.dto';

@Controller('pors')
export class PorController {
  constructor(private readonly porService: PorService) {}
  @Get()
  async findAll(): Promise<Por[]> {
    console.log('I returned pors from', process.env.PORT_LISTENING);
    return await this.porService.findAll();
  }
  @Get('test')
  async testRes(): Promise<{ message: string }> {
    return { message: `Responding from ${process.env.PORT_LISTENING}` };
  }

  @Get('dept/:deptId')
  async findByDept(@Param() params): Promise<Por[]> {
    return await this.porService.findByDept(params.deptId);
  }

  @Post()
  async createPor(@Body() por: CreatePorDto): Promise<void> {
    return await this.porService.createPor(por);
  }
}

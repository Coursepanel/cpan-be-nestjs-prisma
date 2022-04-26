import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  async findAll(): Promise<string> {
    return `Responding from ${process.env.PORT_LISTENING}`;
  }
}

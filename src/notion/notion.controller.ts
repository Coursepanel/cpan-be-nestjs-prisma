import { Controller, Get, Param, Query } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get()
  async getCoursesDb() {
    return this.notionService.getCourseDb();
  }

  @Get('dept/:deptId')
  async getCoursesByDept(@Query('deptId') deptId) {
    return this.notionService.getCoursesByDept(deptId);
  }
}

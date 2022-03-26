import { Controller, Get, Param } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get()
  async getCoursesDb() {
    return this.notionService.getCourseDb();
  }

  @Get('dept/:deptId')
  async getCoursesByDept(@Param() params: { deptId: string }) {
    return this.notionService.getCoursesByDept(params.deptId);
  }
}

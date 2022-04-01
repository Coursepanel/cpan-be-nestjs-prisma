import { CourseService } from './course.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get()
  async findAll(): Promise<Course[]> {
    return await this.courseService.findAll();
  }

  @Get('dept/:deptId')
  async findByDept(@Param() params): Promise<Course[]> {
    return await this.courseService.findByDept(params.deptId);
  }

  @Post()
  async createCourse(@Body() course: CreateCourseDto): Promise<void> {
    return await this.courseService.createCourse(course);
  }
}

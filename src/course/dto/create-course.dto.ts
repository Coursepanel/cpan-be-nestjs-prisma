export class CreateCourseDto {
  courseCode: string;
  name: string;
  description?: string;
  textBooks?: string;
  referenceBooks?: string;
  prerequisites?: string[];
}

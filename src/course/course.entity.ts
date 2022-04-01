import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('courses')
export class Course {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  courseCode: string;

  @Column('varchar', { length: 2 })
  deptCode: string;

  @Column('varchar')
  name: string;

  @Column()
  credits: number;

  @Column()
  description?: string;

  @Column()
  textBooks?: string;

  @Column()
  referenceBooks?: string;

  @Column()
  prerequisites?: string[];
  // TODO :Add one-to-many mapping between course & user
}
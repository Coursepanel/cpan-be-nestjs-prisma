import { Department } from './../department/department.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';

@Entity('courses')
export class Course {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  courseCode: string;

  // @Column('varchar', { length: 2 })
  // deptCode: string;

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

  //TODO : add type safety
  @Column('varchar')
  courseType: string;

  @Column('varchar')
  name: string;

  @Column()
  credits: number;

  @Column()
  description?: string;

  @Column()
  courseContent?: string[];

  @Column()
  textBooks?: string[];

  @Column()
  referenceBooks?: string[];

  @Column()
  prerequisites?: string[];
  // TODO :Add one-to-many mapping between course & user
}

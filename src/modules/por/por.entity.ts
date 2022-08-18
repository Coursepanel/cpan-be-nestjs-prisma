import { Institute } from 'src/modules/institute/institute.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';

@Entity('pors')
export class Por {
  @ObjectIdColumn()
  id: ObjectID;

  @OneToOne(() => Institute)
  @JoinColumn()
  institute: string;

  @Column('varchar', { length: 2 })
  deptCode: string;

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

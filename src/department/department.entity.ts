import { Institute } from 'src/institute/institute.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
  RelationId,
  BaseEntity,
} from 'typeorm';

@Entity('departments')
export class Department extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  name: string;

  @Column({
    type: 'simple-array',
    default: [],
  })
  achievements: string[];

  @Column()
  // @OneToOne((type) => Institute)
  // @JoinColumn({ referencedColumnName: 'id', name: 'insti_id' })
  // institute: Institute;
  // @RelationId((department: Department) => department.institute)
  insti_id: string;
}

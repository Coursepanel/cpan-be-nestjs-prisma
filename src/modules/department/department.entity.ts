import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  RelationId,
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
  // @OneToOne(() => Institute, { cascade: true })
  // @JoinColumn({ referencedColumnName: 'id', name: 'insti_id' })
  // institute: Institute;
  // @RelationId((department: Department) => department.institute)
  insti_id: string;
}

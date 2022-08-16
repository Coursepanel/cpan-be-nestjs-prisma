import { Column, Entity, ObjectID, ObjectIdColumn, BaseEntity } from 'typeorm';

@Entity('semesters')
export class Semester extends BaseEntity {
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
  // @RelationId((department: Semester) => department.institute)
  insti_id: string;
}

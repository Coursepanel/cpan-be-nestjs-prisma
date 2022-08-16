import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('institutes')
export class Institute {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('varchar')
  name: string;

  @Column('varchar')
  location_url: string;

  @Column({
    type: 'simple-array',
    default: [],
  })
  location_address: string[];

  @Column({
    type: 'simple-array',
    default: [],
  })
  images: string[];

  @Column()
  normalization_factor: number;

  // TODO : Add data for self join, refer https://github.com/Logistics-Lab/typegraphql-api
  @Column({
    type: 'simple-array',
    default: [],
  })
  partner_insti_ids: string[];
}

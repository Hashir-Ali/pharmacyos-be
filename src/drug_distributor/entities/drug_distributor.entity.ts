import { ObjectId } from 'mongodb';
import { BasicEntity } from 'src/common/base.entity';
import { Entity, ObjectIdColumn, Column } from 'typeorm';
@Entity('DrugDistributor')
export class DrugDistributor extends BasicEntity {
  @Column()
  distributorId: ObjectId | string;

  @Column()
  drugId: ObjectId | string;

  @Column()
  type: string; // Shall be an enum...!

  @Column()
  is_preferred: Boolean;
}

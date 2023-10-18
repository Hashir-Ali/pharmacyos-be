import { ObjectId } from 'mongodb';
import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('DrugDispense')
export class DrugDispense extends BasicEntity {
  @Column()
  drugId: ObjectId | String;

  @Column()
  quantity: number;

  @Column()
  dispenseValue: String;
}

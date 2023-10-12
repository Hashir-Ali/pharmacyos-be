import { ObjectId } from 'mongodb';
import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';
@Entity('Stock')
export class Stock extends BasicEntity {
  @Column()
  drugId: ObjectId | String;

  @Column()
  stockRuleMin: Number;

  @Column()
  stockRuleMax: Number;

  @Column()
  currentStock: Number;

  @Column()
  LooseUnits: Number;
}

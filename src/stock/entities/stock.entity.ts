import { ObjectId } from 'mongodb';
import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';
@Entity('Stock')
export class Stock extends BasicEntity {
  @Column()
  drugId: ObjectId | String;

  @Column()
  stockRuleMin: number;

  @Column()
  stockRuleMax: number;

  @Column()
  currentStock: number;

  @Column()
  LooseUnits: number;
}

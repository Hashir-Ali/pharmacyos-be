import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';
@Entity('Distributor')
export class Distributor extends BasicEntity {
  @Column()
  name: string;
  @Column()
  NHS_Contract_End_Date: Date;
}

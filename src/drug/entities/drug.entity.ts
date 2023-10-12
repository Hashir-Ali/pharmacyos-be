import { BasicEntity } from 'src/common/base.entity';
import { Entity, Column } from 'typeorm';
@Entity('Drug')
export class Drug extends BasicEntity {
  @Column()
  name: string;
  @Column()
  dosage: Number;
  @Column()
  dosageUnit: string;
  @Column()
  dosageForm: string; // dosage form shall be an enum...!
  @Column()
  BNFCode: string;
  @Column()
  fullDescription: string;
  @Column()
  containerSize: Number;
  @Column()
  location: string;
  @Column()
  drugEAN: Number;
}

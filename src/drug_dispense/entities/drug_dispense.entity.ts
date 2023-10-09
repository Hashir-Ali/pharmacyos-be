import { BasicEntity } from "src/common/base.entity";
import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity('DrugDispense')
export class DrugDispense extends BasicEntity {

    @Column()
    drugId: String;

    @Column()
    quantity: String;

    @Column()
    dispenseValue: String;
}

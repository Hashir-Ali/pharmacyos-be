import { BasicEntity } from "src/common/base.entity";
import { Entity, Column } from "typeorm";
@Entity('DrugOrder')
export class DrugOrder extends BasicEntity {
    @Column()
    supplierId: string;

    @Column()
    drugId: string;

    @Column()
    ordered_by: string; // user Id.

    @Column()
    quantityOrdered: Number;

    @Column()
    quantityReceived: Number;

    @Column()
    cost: Number;

    @Column()
    isReceived: Boolean;

    @Column()
    expected_delivery_date: Date;
}

import { ObjectId } from "mongodb";
import { BasicEntity } from "src/common/base.entity";
import { Entity, Column } from "typeorm";
@Entity('DrugOrder')
export class DrugOrder extends BasicEntity {
    @Column()
    supplierId: ObjectId | string;

    @Column()
    drugId: ObjectId | string;

    @Column()
    ordered_by: ObjectId | string; // user Id.

    @Column()
    quantityOrdered: number;

    @Column()
    quantityReceived: number;

    @Column()
    cost: number;

    @Column()
    isReceived: Boolean;

    @Column()
    expected_delivery_date: Date;
}

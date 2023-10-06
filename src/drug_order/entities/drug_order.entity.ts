import { Entity, ObjectIdColumn, Column } from "typeorm";
@Entity('DrugOrder')
export class DrugOrder {
    @ObjectIdColumn()
    orderId: string;

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

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    is_enabled: Boolean;
}

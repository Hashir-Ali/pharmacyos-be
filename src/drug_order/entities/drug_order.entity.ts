import { Column, PrimaryGeneratedColumn } from "typeorm";

export class DrugOrder {
    @PrimaryGeneratedColumn()
    orderId: String;

    @Column()
    supplierId: String;

    @Column()
    drugId: String;

    @Column()
    quantityOrdered: Number;

    @Column()
    quantityReceived: Number;

    @Column()
    cost: Number;

    @Column()
    isReceived: Number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    is_enabled: Boolean;
}

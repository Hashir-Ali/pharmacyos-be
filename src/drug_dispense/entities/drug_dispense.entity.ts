import { Column, PrimaryGeneratedColumn } from "typeorm";

export class DrugDispense {
    @PrimaryGeneratedColumn()
    drugDispenseId: String;

    @Column()
    drugId: String;

    @Column()
    quantity: String;

    @Column()
    dispenseValue: String;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    is_enabled: Boolean;
}

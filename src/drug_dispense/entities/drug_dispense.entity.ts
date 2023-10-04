import { Entity, ObjectIdColumn } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('DrugDispense')
export class DrugDispense {
    @ObjectIdColumn()
    _id: String;

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

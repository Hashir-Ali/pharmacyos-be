import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('DrugDistributor')
export class DrugDistributor {

    @PrimaryGeneratedColumn()
    drugDistributorId: String;

    @Column()
    distributorId: String;

    @Column()
    drugId: String;

    @Column()
    type: String; // Shall be an enum...!

    @Column()
    is_preferred: Boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    is_enabled: Boolean;
}

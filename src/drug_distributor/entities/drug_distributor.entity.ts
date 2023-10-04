import { Column, PrimaryGeneratedColumn } from "typeorm";

export class DrugDistributor {

    @PrimaryGeneratedColumn()
    drugDistributorId: String;

    @Column()
    distributorId: String;

    @Column()
    drugId: String;

    @Column()
    type: String;

    @Column()
    is_preferred: Boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    is_enabled: Boolean;
}

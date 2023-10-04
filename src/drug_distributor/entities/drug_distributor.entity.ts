import { Entity, ObjectIdColumn, Column } from "typeorm";
@Entity('DrugDistributor')
export class DrugDistributor {

    @ObjectIdColumn()
    drugDistributorId: string;

    @Column()
    distributorId: string;

    @Column()
    drugId: string;

    @Column()
    type: string; // Shall be an enum...!

    @Column()
    is_preferred: Boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    is_enabled: Boolean;
}

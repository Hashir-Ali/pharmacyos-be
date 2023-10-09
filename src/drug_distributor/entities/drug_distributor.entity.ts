import { BasicEntity } from "src/common/base.entity";
import { Entity, ObjectIdColumn, Column } from "typeorm";
@Entity('DrugDistributor')
export class DrugDistributor extends BasicEntity {
    @Column()
    distributorId: string;

    @Column()
    drugId: string;

    @Column()
    type: string; // Shall be an enum...!

    @Column()
    is_preferred: Boolean;
}

import { Entity, ObjectIdColumn } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Drug')
export class Drug {
    @ObjectIdColumn()
    _id: string;
    @Column()
    name: string;
    @Column()
    dosage: Number;
    @Column()
    dosageUnit: string;
    @Column()
    dosageForm: string; // dosage form shall be an enum...!
    @Column()
    BNFCode: string;
    @Column()
    fullDescription: string;
    @Column()
    containerSize: Number;
    @Column()
    location: string;
    @Column()
    drugEAN: Number;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
    @Column()
    is_enabled: Boolean;
}



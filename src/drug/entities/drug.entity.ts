import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Drug')
export class Drug {
    @PrimaryGeneratedColumn()
    drugId: String;
    @Column()
    name: String;
    @Column()
    dosage: Number;
    @Column()
    dosageUnit: String;
    @Column()
    dosageForm: String;
    @Column()
    BNFCode: String;
    @Column()
    fullDescription: String;
    @Column()
    containerSize: Number;
    @Column()
    location: String;
    @Column()
    drugEAN: Number;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
    @Column()
    is_enabled: Boolean;
}



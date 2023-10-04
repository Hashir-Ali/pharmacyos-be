import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Distributor {
    @PrimaryGeneratedColumn()
    distributorId: String;
    @Column()
    name: String;
    @Column()
    NHS_Contract_End_Date: Date;
    @Column()
    created_at: Date;
    @Column()
    Updated_at: Date;
    @Column()
    is_enabled: Boolean;
}

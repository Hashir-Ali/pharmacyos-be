import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Stock {
    @PrimaryGeneratedColumn()
    stockId: String;

    @Column()
    drugId: String;

    @Column()
    stockRuleMin: Number;

    @Column()
    stockRuleMax: Number;

    @Column()
    currentStock: Number;

    @Column()
    LooseUnits: Number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column()
    is_enabled: Boolean;
}

import { Entity, ObjectIdColumn, Column } from "typeorm";
@Entity('Stock')
export class Stock {
    @ObjectIdColumn()
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

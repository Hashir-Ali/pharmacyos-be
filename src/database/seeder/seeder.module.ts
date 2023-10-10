import { UsersModule } from './../../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { DBSeeder } from "./seeder_db.service";
import { DrugModule } from "src/drug/drug.module";
import { DistributorModule } from "src/distributor/distributor.module";
import { DrugDistributorModule } from "src/drug_distributor/drug_distributor.module";
import { DrugOrderModule } from "src/drug_order/drug_order.module";
import { DrugDispenseModule } from "src/drug_dispense/drug_dispense.module";
import { StockModule } from 'src/stock/stock.module';
import { dataSourceOptions } from '../database.constants';

@Module({
    imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, DrugModule, DistributorModule, DrugDistributorModule, DrugOrderModule, DrugDispenseModule, StockModule],
    controllers: [],
    providers: [DBSeeder]
})
export class SeederModule{}
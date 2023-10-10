import { StockService } from './../../stock/stock.service';
import { DrugDispenseService } from './../../drug_dispense/drug_dispense.service';
import { DistributorService } from 'src/distributor/distributor.service';
import { DrugService } from './../../drug/drug.service';
import { Injectable } from "@nestjs/common";
import { DrugOrderService } from 'src/drug_order/drug_order.service';
import { DrugDistributorService } from 'src/drug_distributor/drug_distributor.service';

@Injectable()
export class DBSeeder {
    constructor(
        private readonly drugService: DrugService,
        private readonly distributorService: DistributorService,
        private drugDistributorService: DrugDistributorService,
        private drugOrderService: DrugOrderService,
        private drugDispenseService: DrugDispenseService,
        private stockService: StockService,
    ){}
    


    async seed(seedCount: number){

        await this.drugService.seedDrug(seedCount);
        await this.distributorService.seedDistributor(seedCount);
        await this.drugDistributorService.seedDrugDistributor(seedCount);
        await this.drugOrderService.seedDrugOrder(seedCount);
        await this.drugDispenseService.seedDrugDispense(seedCount);
        await this.stockService.seedStock(seedCount);

        return Promise.resolve();
    }
}
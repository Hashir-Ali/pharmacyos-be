import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { DrugOrder } from 'src/drug_order/entities/drug_order.entity';

export default class DrugOrderSeeder implements Seeder{
    public async run(
        DataSource: DataSource,
        factoryManager: SeederFactoryManager
    ){
        const drugOrder = factoryManager.get(DrugOrder);
        await drugOrder.saveMany(20);

        console.log("Generated Drug Orders: ", drugOrder);
    }
}
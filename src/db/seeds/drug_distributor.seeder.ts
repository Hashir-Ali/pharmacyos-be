import { SeederFactoryManager, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { DrugDistributor } from 'src/drug_distributor/entities/drug_distributor.entity';

export default class DrugDistributorSeeder implements Seeder{
    public async run(
        DataSource: DataSource,
        factoryManager: SeederFactoryManager
    ){
        const drugDistributorFactory = factoryManager.get(DrugDistributor);
        const savedDrugDistributors = await drugDistributorFactory.saveMany(20);

        console.log("Generated Drug Distributors: ", savedDrugDistributors);
    }
}
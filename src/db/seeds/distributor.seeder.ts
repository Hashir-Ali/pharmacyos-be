import { DataSource } from 'typeorm';
import { SeederFactoryManager, Seeder} from "typeorm-extension";
import { Distributor } from "src/distributor/entities/distributor.entity";
import { DrugDistributor } from 'src/drug_distributor/entities/drug_distributor.entity';

export default class DistributorSeeder implements Seeder{
    public async run(
        DataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ):Promise<void>{
        const distributorFactory = factoryManager.get(Distributor);
        const savedData = await distributorFactory.saveMany(20);
        console.log("Generated Distributors: ", distributorFactory);
        // factoryManager.set(DrugDistributor, (value)=>{})
        // for (let each = 0; each < savedData.length; each++) {
        //     const record = savedData[each];
        //     record._id 
        //     // create 
        // }
    }
}
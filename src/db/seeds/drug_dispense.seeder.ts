import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { DrugDispense } from 'src/drug_dispense/entities/drug_dispense.entity';


export default class DrugDispenseSeeder implements Seeder{
    public async run(
        DataSource: DataSource,
        factoryManager: SeederFactoryManager
    ){
        const drugDispenseFactory = factoryManager.get(DrugDispense);
        const savedDispense = await drugDispenseFactory.saveMany(10);
        
        console.log('Generated Drug Dispense values: ', savedDispense);
    }
}
import { DataSource } from 'typeorm';
import { SeederFactoryManager, Seeder } from 'typeorm-extension';
import { Drug } from 'src/drug/entities/drug.entity';

export default class DrugSeeder implements Seeder{
    public async run(
        DataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ):Promise<void>{
        const drugFactory = factoryManager.get(Drug);
        const generatedDrugs = await drugFactory.saveMany(20);
        console.log("Generated Drugs: ", generatedDrugs);
    }
}
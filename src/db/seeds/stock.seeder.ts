import { Stock } from 'src/stock/entities/stock.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class StockSeeder implements Seeder {
    public async run(
        DataSource: DataSource,
        factoryManager: SeederFactoryManager
    ){
        const stockFactory = factoryManager.get(Stock);
        const savedStock = await stockFactory.saveMany(10);

        console.log("Generated Stock Entries: ", savedStock);
    }
}
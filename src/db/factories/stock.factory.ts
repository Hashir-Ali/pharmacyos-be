import { DataSource } from 'typeorm';
import { Stock } from 'src/stock/entities/stock.entity';
import { setSeederFactory } from 'typeorm-extension';
import { Drug } from 'src/drug/entities/drug.entity';
import { randomInt } from 'crypto';

export default setSeederFactory(Stock, async (faker, dataSource: DataSource)=>{
    
    const Drugs = await dataSource.getMongoRepository(Drug).find();
    const drugId = Drugs[randomInt(Drugs.length - 1)]._id;

    const stock = new Stock();
    stock.stockRuleMin = faker.number.int({min: 2, max: 200});
    stock.stockRuleMax = faker.number.int({min: 200, max: 500});
    stock.LooseUnits = faker.number.int({min: 10, max: 50});

    return stock;

});
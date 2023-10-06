import { randomInt } from 'crypto';
import { Drug } from 'src/drug/entities/drug.entity';
import { DrugDispense } from 'src/drug_dispense/entities/drug_dispense.entity';
import { DataSource } from 'typeorm';
import { setSeederFactory } from 'typeorm-extension';
export default setSeederFactory(DrugDispense, async (faker, dataSource: DataSource)=>{

    const Drugs = await dataSource.getMongoRepository(Drug).find();
    const drugId = Drugs[randomInt(Drugs.length - 1)]._id;

    const drugDispense = new DrugDispense();
    drugDispense.drugId = drugId;
    drugDispense.quantity = faker.finance.amount(5, 100, 0);
    drugDispense.dispenseValue = faker.finance.amount(1, 50, 0);

    return drugDispense;

});
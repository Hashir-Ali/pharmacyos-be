import { DataSource } from 'typeorm';
import { DrugOrder } from 'src/drug_order/entities/drug_order.entity';
import { setSeederFactory } from 'typeorm-extension';
import { Distributor } from 'src/distributor/entities/distributor.entity';
import { randomInt } from 'crypto';
import { Drug } from 'src/drug/entities/drug.entity';
export default setSeederFactory(DrugOrder, async (faker, dataSource:DataSource)=>{

    const distributor = await dataSource.getMongoRepository(Distributor).find();
    const distributorId = distributor[randomInt(distributor.length -1)]._id;

    const Drugs = await dataSource.getMongoRepository(Drug).find();
    const drugId = Drugs[randomInt(Drugs.length -1)]._id;

    const drugOrder = new DrugOrder();
    drugOrder.supplierId = distributorId;
    drugOrder.drugId = drugId;
    drugOrder.ordered_by = 'Hashir Shah'; // No magical Strings... This, I know is a bad code and it smells like rotten rats.
    drugOrder.quantityOrdered = parseInt(faker.finance.amount(0, 50));
    drugOrder.quantityReceived = parseInt(faker.finance.amount(0, 50));
    drugOrder.cost = parseInt(faker.finance.amount(100, 2000));
    drugOrder.isReceived = faker.datatype.boolean(0.75); // 0-1 : 0.75 means 75% of true boolean value...
    drugOrder.expected_delivery_date = faker.date.future({years: 2});

    return drugOrder;
});
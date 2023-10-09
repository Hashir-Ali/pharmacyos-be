import { randomInt } from "crypto";
import { setSeederFactory } from "typeorm-extension";
import { DrugDistributor } from "src/drug_distributor/entities/drug_distributor.entity";
import { DataSource } from "typeorm";
import { Drug } from "src/drug/entities/drug.entity";
import { Distributor } from "src/distributor/entities/distributor.entity";

export default setSeederFactory(DrugDistributor, async (faker, dataSource:DataSource)=>{
    const drugDistributorTypes = ['Preferred Supplier', "Other Supplier", "Contracted Supplier"];

    const distributor = await dataSource.getMongoRepository(Distributor).find();
    const distributorId = distributor[randomInt(distributor.length -1)]._id;

    const Drugs = await dataSource.getMongoRepository(Drug).find();
    const drugId = Drugs[randomInt(Drugs.length - 1)]._id;

    
    const drugDistributor = new DrugDistributor();

    drugDistributor.distributorId = distributorId;
    drugDistributor.drugId = drugId;
    drugDistributor.type = drugDistributorTypes[randomInt(2)];
    
    return drugDistributor;
});
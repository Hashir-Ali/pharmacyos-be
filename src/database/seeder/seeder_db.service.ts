import { StockService } from './../../stock/stock.service';
import { DrugDispenseService } from './../../drug_dispense/drug_dispense.service';
import { DistributorService } from 'src/distributor/distributor.service';
import { DrugService } from './../../drug/drug.service';
import { Injectable } from "@nestjs/common";
import { DrugOrderService } from 'src/drug_order/drug_order.service';
import { DrugDistributorService } from 'src/drug_distributor/drug_distributor.service';
import { faker } from '@faker-js/faker';
import { Stock } from 'src/stock/entities/stock.entity';
import { randomInt } from 'crypto';
import { DrugDispense } from 'src/drug_dispense/entities/drug_dispense.entity';
import { DrugOrder } from 'src/drug_order/entities/drug_order.entity';
import { DrugDistributor } from 'src/drug_distributor/entities/drug_distributor.entity';
import { Distributor } from 'src/distributor/entities/distributor.entity';
import { Drug } from 'src/drug/entities/drug.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DBSeeder {
    constructor(
        private readonly userService: UsersService,
        private readonly drugService: DrugService,
        private readonly distributorService: DistributorService,
        private drugDistributorService: DrugDistributorService,
        private drugOrderService: DrugOrderService,
        private drugDispenseService: DrugDispenseService,
        private stockService: StockService,
    ){}
    
    async seedStock(seedCount: number){

        const objectDto: Stock[] = [];
        const drugs = await this.drugService.findAll();
          
        for(let i = 0; i <= seedCount; i++){
          const drugId = drugs[randomInt(drugs.length - 1)]._id;
          objectDto.push(
            {
              drugId: drugId,
              stockRuleMin: faker.number.int({min: 10, max: 100}),
              stockRuleMax: faker.number.int({min: 100, max: 1000}),
              currentStock: faker.number.int({min: 50, max: 500}),
              LooseUnits: faker.number.int({min: 20, max: 65}),
              created_at: faker.date.recent(),
              Updated_at: faker.date.recent(),
              is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...  
            }
          );
        }
    
        const savedStock = await this.stockService.insertMany(objectDto);
        return savedStock;
    }

    async seedDrugDispense(seedCount: number){
        const objectDto: DrugDispense[] = [];
        const drugs = await this.drugService.findAll();
    
        for(let i = 0; i <= seedCount; i++){
          const drugId = drugs[randomInt(drugs.length - 1)]._id;
          
          objectDto.push({
            drugId: drugId,
            quantity: faker.finance.amount(5, 100, 0),
            dispenseValue: faker.finance.amount(1, 50, 0),
            created_at: faker.date.recent(),
            Updated_at: faker.date.recent(),
            is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
          })
        }
        const savedItems = await this.drugDispenseService.insertMany(objectDto);
        return savedItems;
    }

    async seedDrugOrder(seedCount: number){
        const savedDto: DrugOrder[] = [];
        const distributor = await this.distributorService.findAll();
        const drugs = await this.drugService.findAll();
        const users = await this.userService.findAll();
        
        for(let i=0; i<= seedCount; i++){
          const distributorId = distributor[randomInt(distributor.length -1)]._id;
          const drugId = drugs[randomInt(drugs.length - 1)]._id;
          const userId = users[randomInt(users.length -1)]._id;

          savedDto.push({
            supplierId: distributorId,
            drugId: drugId,
            ordered_by: userId, // No magical Strings... This, I know is a bad code and it smells like rotten rats.,
            quantityOrdered: parseInt(faker.finance.amount(0, 50)),
            quantityReceived: parseInt(faker.finance.amount(0, 50)),
            cost: parseInt(faker.finance.amount(100, 2000)),
            isReceived: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
            expected_delivery_date: faker.date.future({years: 2}),
            created_at: faker.date.recent(),
            Updated_at: faker.date.recent(),
            is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
          });
        }
        const savedItems = await this.drugOrderService.insertMany(savedDto);
        return savedItems;
    }

    async seedDrugDistributor(seedCount: number){
        const objectDto: DrugDistributor[] = [];
        const drugDistributorTypes = ['Preferred Supplier', "Other Supplier", "Contracted Supplier"];
    
        const distributor = await this.distributorService.findAll();
        const distributorId = distributor[randomInt(distributor.length -1)]._id;
    
        const drugs = await this.drugService.findAll();
     
        for( let i = 0; i <= seedCount; i++){
          const drugId = drugs[randomInt(drugs.length - 1)]._id;
          objectDto.push(
            {
              distributorId: distributorId,
              drugId: drugId,
              type: drugDistributorTypes[randomInt(2)],
              is_preferred: true,
              created_at: faker.date.recent(),
              Updated_at: faker.date.recent(),
              is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
            }
          )
        }
        const savedData = await this.drugDistributorService.insertMany(objectDto);
        return savedData;
    }

    async seedDistributor(seedCount: number){

        const objectDto: Distributor[] = [];
        for(let i = 0; i <= seedCount; i++){
          objectDto.push(
            {
              name: faker.person.fullName(),
              NHS_Contract_End_Date: faker.date.future(),
              created_at: faker.date.recent(),
              Updated_at: faker.date.recent(),
              is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
            
            }
          )
        }
    
        const savedItems = await this.distributorService.insertMany(objectDto);
        return savedItems;
    }

    async seedDrug(seedCount: number){
        const drugNames: string[] = [
            'Omeprazole_Cap', 
            'Dressit Ster Dress Pack', 
            "Flaminal Forte",
            "Co-Magaldrox_Susp",
            "Antacid/Oxetacaine_Oral Susp",
            "Simeticone_Susp",
            "Infacol_Susp",
            "Gppe Liq_Gaviscon",
            "Sod Algin/Pot Bicarb_Susp",
            "Sod Alginate/Pot Bicarb_Tab Chble",
            "Gastrocote_Tab",
            "Gaviscon Infant_Sach",
            "Gaviscon Advance_Liq",
            "Gaviscon_Liq Sach",
            "Gaviscon Advance_Liq",
            "Gaviscon Advance_Tab",
            "Topal_Antacid Tab",
            "Peptac_Liq (Aniseed)",
            "Peptac_Liq (Peppermint)",
            "Alverine",
            "Dicycloverine",
            "Dicycloverine HCl_Tab",
            "Hyoscine Butylbrom_Inj",
            "Buscopan_Tab",
            "Mebeverine HCl_Tab",
            "Mebeverine HCl_Cap",
            "Cimetidine_Tab 400mg",
        ];
        // loop till seedCount.
        // create array of objectDTO...
        // pass objectDto to saveMany function...
        const objectDTO: Drug[]= [];
    
        for( let i = 0; i <= seedCount; i++ ){
            objectDTO.push(
              {
                name: drugNames[randomInt(drugNames.length-1)],
                dosage: randomInt(500),
                dosageUnit: faker.science.unit().symbol,
                dosageForm: 'Film coated Tablets',
                BNFCode: faker.number.int({min: 1000000}).toString(),
                fullDescription: faker.commerce.productDescription(),
                containerSize: randomInt(20),
                location: faker.location.zipCode(),
                drugEAN: faker.number.int({min: 1000000}),
                created_at: faker.date.recent(),
                Updated_at: faker.date.recent(),
                is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
              }
            );
        }
        const seedThem = await this.drugService.insertMany(objectDTO);
        return seedThem;
    }

    async seed(seedCount: number){

        await this.seedDrug(seedCount);
        await this.seedDistributor(seedCount);
        await this.seedDrugDistributor(seedCount);
        await this.seedDrugOrder(seedCount);
        await this.seedDrugDispense(seedCount);
        await this.seedStock(seedCount);

        return Promise.resolve();
    }
}
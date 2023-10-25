import { StockService } from './../../stock/stock.service';
import { DrugDispenseService } from './../../drug_dispense/drug_dispense.service';
import { DistributorService } from 'src/distributor/distributor.service';
import { DrugService } from './../../drug/drug.service';
import { Injectable } from '@nestjs/common';
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
import { ObjectId } from 'mongodb';

@Injectable()
export class DBSeeder {
  private seedCount: number;
  constructor(
    private readonly userService: UsersService,
    private readonly drugService: DrugService,
    private readonly distributorService: DistributorService,
    private drugDistributorService: DrugDistributorService,
    private drugOrderService: DrugOrderService,
    private drugDispenseService: DrugDispenseService,
    private stockService: StockService,
  ) {
    this.seedCount = 20;
  }

  async seedStock() {
    const objectDto: Stock[] = [];
    const drugs = await this.drugService.findAll();

    for (let i = 0; i <= drugs.length - 1; i++) {
      objectDto.push({
        drugId: new ObjectId(drugs[i]._id),
        stockRuleMin: faker.number.int({ min: 5, max: 20 }),
        stockRuleMax: faker.number.int({ min: 40, max: 100 }),
        currentStock: faker.number.int({ min: 5, max: 100 }),
        LooseUnits: faker.number.int({ min: 5, max: 25 }),
        created_at: faker.date.recent(),
        Updated_at: faker.date.recent(),
        is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means out the possibility of returning true would be 75% and remaining times will return false.
      });
    }

    const savedStock = await this.stockService.insertMany(objectDto);
    return savedStock;
  }

  async seedDrugDispense() {
    const objectDto: DrugDispense[] = [];
    const drugs = await this.drugService.findAll();

    // get monthly dates for current year...!
    const thisYearMonths = Array.from({ length: 12 }, (item, i) => {
      return new Date(new Date().getFullYear(), i);
    });

    for (let i = 0; i <= drugs.length - 1; i++) {
      const drugId = drugs[i]._id;
      const drugStock = await this.stockService.findDrugStock(drugId);

      for (let j = 0; j <= thisYearMonths.length - 1; j++) {
        // for each month generate at least 4 records....
        for (let k = 0; k <= 3; k++) {
          objectDto.push({
            drugId: new ObjectId(drugId),
            quantity: parseInt(
              faker.finance.amount(
                drugStock.stockRuleMin / 3,
                drugStock.stockRuleMax / 3,
                0,
              ),
            ),
            dispenseValue: faker.finance.amount(1, 50, 0),
            created_at: faker.date.betweens(
              thisYearMonths[j],
              thisYearMonths[j],
            )[0],
            Updated_at: faker.date.betweens(
              thisYearMonths[j],
              thisYearMonths[j],
            )[1],
            is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
          });
        }
      }
    }
    const savedItems = await this.drugDispenseService.insertMany(objectDto);
    return savedItems;
  }

  async seedDrugOrder() {
    const savedDto: DrugOrder[] = [];
    // get monthly dates for current year...!
    const thisYearMonths = Array.from({ length: 12 }, (item, i) => {
      return new Date(new Date().getFullYear(), i);
    });

    const drugs = await this.drugService.findAll();
    const users = await this.userService.findAll();

    for (let i = 0; i <= drugs.length - 1; i++) {
      const drugId = drugs[i]._id;
      const drugStock = await this.stockService.findDrugStock(drugId);
      // we need at least 10 orders per drug...!
      // for each drug, fetch specific drug distributor...!
      // each drug order will be after 30 preceding days...!
      const drugDistributor = await this.drugDistributorService.findOne(drugId);
      let days = 30;
      for (let j = 0; j <= thisYearMonths.length; j++) {
        const userId =
          users[Math.abs(Math.ceil(Math.random() * users.length - 1))]._id;

        savedDto.push({
          supplierId: new ObjectId(
            drugDistributor[
              randomInt(drugDistributor.length - 1)
            ].distributorId,
          ),
          drugId: new ObjectId(drugId),
          ordered_by: new ObjectId(userId), // No magical Strings... This, I know is a bad code and it smells like rotten rats.,
          quantityOrdered: randomInt(
            drugStock.stockRuleMax - drugStock.stockRuleMin,
          ),
          quantityReceived: randomInt(
            drugStock.stockRuleMax - drugStock.stockRuleMin,
          ),
          cost: parseInt(faker.finance.amount(2, 300)),
          isReceived: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
          expected_delivery_date: faker.date.soon({ days: days }),
          created_at: faker.date.betweens(
            thisYearMonths[j],
            thisYearMonths[j],
          )[0],
          Updated_at: faker.date.betweens(
            thisYearMonths[j],
            thisYearMonths[j],
          )[1],
          is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
        });
        days = days + 30; // each next month..
      }
    }
    const savedItems = await this.drugOrderService.insertMany(savedDto);
    return savedItems;
  }

  async seedDrugDistributor() {
    const objectDto: DrugDistributor[] = [];
    const drugDistributorTypes = [
      'Preferred Distributor',
      'Contracted Distributor',
      'Other Distributor',
    ];

    const distributor = await this.distributorService.findAll();
    const drugs = await this.drugService.findAll();

    for (let i = 0; i <= drugs.length - 1; i++) {
      const drugId = drugs[i]._id;

      // for each drug, we create at least three distributors per drug...
      for (let j = 0; j < 3; j++) {
        const distributorId = distributor[i + j]._id;

        objectDto.push({
          distributorId: new ObjectId(distributorId),
          drugId: new ObjectId(drugId),
          type: drugDistributorTypes[
            j === 0 ? j : randomInt(drugDistributorTypes.length - 1) // first record set to preferred distributor
          ],
          is_preferred: j == 0 ? true : false, // first record set to preferred distributor.
          created_at: faker.date.recent(),
          Updated_at: faker.date.recent(),
          is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means the possibility for returning true will be 75% times...
        });
      }
    }
    const savedData = await this.drugDistributorService.insertMany(objectDto);
    return savedData;
  }

  async seedDistributor() {
    const objectDto: Distributor[] = [];
    for (let i = 0; i <= this.seedCount * 3; i++) {
      // create distributors (three times) more than drugs count...
      objectDto.push({
        name: faker.person.fullName(),
        NHS_Contract_End_Date: faker.date.future(),
        created_at: faker.date.recent(),
        Updated_at: faker.date.recent(),
        is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
      });
    }

    const savedItems = await this.distributorService.insertMany(objectDto);
    return savedItems;
  }

  async seedDrug() {
    const drugNames: string[] = [
      'Ribociclib',
      'Amoxicillin',
      'Atorvastatin',
      'Omeprazole',
      'Dressit Ster Dress Pack',
      'Flaminal Forte',
      'Co-Magaldrox',
      'Antacid',
      'Simeticone',
      'Infacol',
      'Gaviscon',
      'Sod Algin',
      'Sod Alginate',
      'Gastrocote',
      'Gaviscon',
      'Topal',
      'Peptac',
      'Alverine',
      'Dicycloverine',
      'Dicycloverine',
      'Hyoscine',
      'Buscopan',
      'Mebeverine',
      'Mebeverine',
      'Cimetidine',
    ];
    const dosageUnits = ['mg', 'ml'];
    // loop till seedCount.
    // create array of objectDTO...
    // pass objectDto to saveMany function...
    const objectDTO: Drug[] = [];

    for (let i = 0; i <= this.seedCount; i++) {
      objectDTO.push({
        name: drugNames[randomInt(drugNames.length - 1)],
        dosage: randomInt(500),
        dosageUnit: dosageUnits[randomInt(dosageUnits.length - 1)],
        dosageForm: 'Film coated Tablets',
        BNFCode: faker.number.int({ min: 1000000 }).toString(),
        fullDescription: faker.commerce.productDescription(),
        containerSize: randomInt(20),
        location: faker.location.zipCode(),
        drugEAN: faker.number.int({ min: 1000000 }),
        created_at: faker.date.recent(),
        Updated_at: faker.date.recent(),
        is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...
      });
    }
    const seedThem = await this.drugService.insertMany(objectDTO);
    return seedThem;
  }

  async seed(seedCount: number) {
    this.seedCount = seedCount;
    await this.seedDrug();
    await this.seedDistributor();
    await this.seedDrugDistributor();
    await this.seedStock();
    await this.seedDrugOrder();
    await this.seedDrugDispense();

    return Promise.resolve();
  }
}

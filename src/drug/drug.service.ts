import { DrugOrderService } from './../drug_order/drug_order.service';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Drug } from './entities/drug.entity';
import { ObjectId } from 'mongodb';
import { DrugDistributorService } from 'src/drug_distributor/drug_distributor.service';
import { DistributorService } from 'src/distributor/distributor.service';
import { StockService } from 'src/stock/stock.service';
import { dateDiff } from 'src/common/utils';
import { DrugDispenseService } from 'src/drug_dispense/drug_dispense.service';
import { SortOrder } from './drug.controller';
import { IssuesService } from 'src/issues/issues.service';

export interface Reporting {
  [month: string]: {
    purchased: { quantity: number; value: number };
    dispensed: { quantity: number; value: number };
  };
}

export interface StockLevel {
  [month: string]: number;
}
@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: MongoRepository<Drug>,
    private drugOrderService: DrugOrderService,
    private drugDistributorService: DrugDistributorService,
    private distributorService: DistributorService,
    private stockService: StockService,
    private drugDispenseService: DrugDispenseService,
    @Inject(forwardRef(() => IssuesService))
    private issuesService: IssuesService,
  ) {}

  // commented for later use...!
  async create(createDrugDto: CreateDrugDto) {
    return await this.drugRepository.save(createDrugDto);
  }

  findAll() {
    return this.drugRepository.find();
  }

  async findFiltered(
    page: string,
    limit: string,
    sort: SortOrder,
    filters: any = {},
  ) {
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const regex = new RegExp(
      filters.filters ? filters.filters.split(' ')[0] : '',
      'i',
    ); // search must include a space after name of the drug if we are passing
    const dose: number = parseInt(
      filters.filters ? filters.filters.replace(/^\D+|\D+$/g, '') : 5000, //passing arbitrary highest value.
    );

    const [drugs, number] = await this.drugRepository.findAndCount({
      where:
        regex.toString().indexOf(dose.toString()) === -1 // if filter contain name and dosage isn't part of the regex, then include name based search.....
          ? dose //dose is set (not a NaN type): Yes: include name and dosage. No: include only name...
            ? {
                name: { $regex: regex },
                dosage: { $lte: dose },
              }
            : { name: { $regex: regex } }
          : {
              // else use only dose based search..
              dosage: { $eq: dose },
            },
      skip: skip,
      take: parseInt(limit),
      order: { name: sort },
    });

    // const status: string[] = ['Issue', 'Good', ''];

    const populatedDrugs = drugs.map(async (drug) => {
      const drugStock = await this.stockService.findDrugStock(drug._id);
      const drugOrder = await this.drugOrderService.findDrugOrders(drug._id);
      // for on orders and new stock (check in drugOrders array)
      // orders not delivered/received then (on order = add(quantityOrdered))
      // new stock is orders delivered and date is not more than 30 days old.
      const deducedStock = { ...drugStock, onOrder: 0, newStock: 0 };
      if (drugOrder.length > 0) {
        drugOrder.map((order) => {
          if (!order.isReceived) {
            deducedStock.onOrder += order.quantityOrdered;
          } else {
            // order was received:
            // now check if order is not older than one month (for new stock)...
            // suggestion: it's better to have actual delivery date stored in collection...
            const monthDays = 30;
            if (dateDiff(order.expected_delivery_date).diffDays <= monthDays) {
              deducedStock.newStock += order.quantityReceived;
            }
          }
        });
      }
      console.log(
        await this.issuesService.findDrugIssues(drug._id),
        'Drug Is: ',
        drug.name,
      );
      return {
        ...drug,
        status:
          (await this.issuesService.findDrugIssues(drug._id)).length > 0
            ? 'Issue'
            : 'Good',
        stock: {
          ...deducedStock,
          ruleType: 'Automatic',
          monthlyStockLevels: await this.monthlyStockLevels(drug._id),
        },
        Orders: {
          lastOrder: `${drugOrder[0].expected_delivery_date.toLocaleDateString(
            'en-GB',
          )} £${drugOrder[0].cost} per unit ${drug.name}`,
        },
      };
    });

    return [await Promise.all(populatedDrugs), number];
  }

  async findFilter(filters: any = {}) {
    const regex = new RegExp(
      filters.filters ? filters.filters.split(' ')[0] : '',
      'i',
    ); // search must include a space after name of the drug if we are passing
    const dose: number = parseInt(
      filters.filters ? filters.filters.replace(/^\D+|\D+$/g, '') : 5000, //passing arbitrary highest value.
    );

    const drugs = await this.drugRepository.findAndCount({
      where:
        regex.toString().indexOf(dose.toString()) === -1 // if filter contain name and dosage isn't part of the regex, then include name based search.....
          ? dose //dose is set (not a NaN type): Yes: include name and dosage. No: include only name...
            ? {
                name: { $regex: regex },
                dosage: { $lte: dose },
              }
            : { name: { $regex: regex } }
          : {
              // else use only dose based search..
              dosage: { $eq: dose },
            },
    });
    return drugs;
  }

  async findOne(id: string) {
    const Drug = await this.drugRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    const drugOrders = await this.drugOrderService.findDrugOrders(id);
    const distributors = await this.findDrugDistributors(Drug._id);
    const stock = await this.stockService.findDrugStock(Drug._id);

    // for on orders and new stock (check in drugOrders array)
    // orders not delivered/received then (on order = add(quantityOrdered))
    // new stock is orders delivered and date is not more than 30 days old.
    const deducedStock = { ...stock, onOrder: 0, newStock: 0 };
    if (drugOrders.length > 0) {
      drugOrders.map((order) => {
        if (!order.isReceived) {
          deducedStock.onOrder += order.quantityOrdered;
        } else {
          // order was received:
          // now check if order is not older than one month (for new stock)...
          // suggestion: it's better to have actual delivery date stored in collection...
          const monthDays = 30;
          if (dateDiff(order.expected_delivery_date).diffDays <= monthDays) {
            deducedStock.newStock += order.quantityReceived;
          }
        }
      });
    }
    return {
      ...Drug,
      orders: drugOrders,
      distributors: distributors,
      stock: deducedStock,
      passThrough: await this.drugPassThrough(Drug._id),
      monthlyStockLevels: await this.monthlyStockLevels(Drug._id),
    };
  }

  async drugReporting(drugId: string): Promise<Reporting> {
    const data: Reporting = {};

    // add 0 as value for months without any data...
    for (let i = 0; i < 12; i++) {
      data[i] = {
        purchased: {
          quantity: 0,
          value: 0,
        },
        dispensed: { quantity: 0, value: 0 },
      };
    }
    const [drugOrders, drugDispense] = await Promise.all([
      this.drugOrderService.getCurrentYearDrugOrders(drugId),
      this.drugDispenseService.getCurrentYearDispense(drugId),
    ]);

    drugOrders.map((drugOrder) => {
      //get month from expected_delivery_date...
      // check if month is present in response data structure...
      // Yes: update quantity and value for that month...
      // No: add to data with initial quantity and value...
      const currentMonth = drugOrder.created_at.getMonth();
      if (currentMonth in data) {
        data[currentMonth].purchased.quantity += drugOrder.quantityReceived;
        data[currentMonth].purchased.value += drugOrder.cost;
      } else {
        data[currentMonth] = {
          purchased: {
            quantity: drugOrder.quantityReceived,
            value: drugOrder.cost,
          },
          dispensed: { quantity: 0, value: 0 },
        };
      }
    });

    drugDispense.map((dispense) => {
      //get month from when dispense was recorded in DB...
      // check if month is present in response data structure...
      // Yes: update quantity and value for that month...
      // No: add to data with initial quantity and value...
      const currentMonth = dispense.created_at.getMonth();
      if (currentMonth in data) {
        data[currentMonth].dispensed.quantity += parseInt(
          dispense.quantity.toString(),
        );
        data[currentMonth].dispensed.value += parseInt(
          dispense.dispenseValue.toString(),
        );
      } else {
        data[currentMonth] = {
          dispensed: {
            quantity: parseInt(dispense.quantity.toString()),
            value: parseInt(dispense.dispenseValue.toString()),
          },
          purchased: { quantity: 0, value: 0 },
        };
      }
    });
    return await data;
  }

  async drugPassThrough(drugId: string) {
    const data = await this.drugDispenseService.countAllTimeDispense(drugId);
    return data;
  }

  async monthlyStockLevels(drugId: string) {
    const data: StockLevel = {};
    // const orders = await this.drugOrderService.getCurrentYearDrugOrders(drugId);
    // create Data structure for each month.
    for (let i = 0; i < 12; i++) {
      data[i] = 0;
    }
    const dispense =
      await this.drugDispenseService.getCurrentYearDispense(drugId);

    dispense.map((dispense) => {
      const month = dispense.created_at.getMonth();
      if (month in data) {
        data[month] += dispense.quantity;
      } else {
        data[month] = dispense.quantity;
      }
    });
    return data;
  }

  async findDrugOrders(drugId: string) {
    const drugOrders = await this.drugOrderService.findDrugOrders(drugId);
    return drugOrders;
  }

  async findDrugDistributors(drugId: string) {
    const drugDistributors = await this.drugDistributorService.findOne(drugId);

    const distributorData = await Promise.all(
      drugDistributors.map(async (drugDistributor) => {
        // get distributors data from distributor IDs...
        const distributor = await this.distributorService.findOneById(
          drugDistributor.distributorId,
        );

        return { ...drugDistributor, ...distributor };
      }),
    );

    return await distributorData;
  }

  async findDrugStock(drugId: string) {
    return await this.stockService.findDrugStock(drugId);
  }

  async insertMany(objectDto: Drug[]) {
    const savedData = await this.drugRepository.insertMany(objectDto);
    return savedData;
  }
}

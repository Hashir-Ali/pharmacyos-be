import { DrugOrderService } from './../drug_order/drug_order.service';
import { Injectable } from '@nestjs/common';
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


export interface Reporting {
  [month: string]:
  {
  purchased?: {quantity: number, value: number},
  dispensed?: {quantity: number, value: number}
  }
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
  ){}

  // commented for later use...!
  async create(createDrugDto: CreateDrugDto) {
    return await this.drugRepository.save(createDrugDto);
  }

  findAll() {
    return this.drugRepository.find();
  }

  async findOne(id: string) {
    const Drug = await this.drugRepository.findOne({where: {_id: new ObjectId(id)}});
    const drugOrders = await this.drugOrderService.findDrugOrders(id);
    const distributors = await this.findDrugDistributors(Drug._id);
    const stock = await this.stockService.findDrugStock(Drug._id);
    
    // for on orders and new stock (check in drugOrders array)
    // orders not delivered/received then (on order = add(quantityOrdered))
    // new stock is orders delivered and date is not more than 30 days old.
    const deducedStock = {...stock, onOrder: 0, newStock: 0};
    if(drugOrders.length > 0){
      const stockData = drugOrders.map((order)=>{
        if(!( order.isReceived )){
          deducedStock.onOrder += order.quantityOrdered;
        }else{
          // order was received: 
          // now check if order is not older than one month (for new stock)...
          // suggestion: it's better to have actual delivery date stored in collection...
          const monthDays = 30;
          if(dateDiff(order.expected_delivery_date).diffDays <= monthDays){
            deducedStock.newStock += order.quantityReceived;
          }
        }
      });
    }
    return {...Drug, orders: drugOrders, distributors: distributors, stock: deducedStock};
  }

  async drugReporting (drugId: string): Promise<Reporting>{
    const data:Reporting = {};

    const drugOrders = await this.drugOrderService.findDrugOrders(drugId);
    const drugDispense = await this.drugDispenseService.findDrugDispense(drugId);

    drugOrders.map((drugOrder)=>{
      //get month from expected_delivery_date...
      // check if month is present in response data structure...
        // Yes: update quantity and value for that month...
        // No: add to data with initial quantity and value...
      const currentMonth = drugOrder.expected_delivery_date.getUTCMonth();
      if( currentMonth in data){
        data[currentMonth].purchased.quantity += drugOrder.quantityReceived;
        data[currentMonth].purchased.value += drugOrder.cost;
      }else{
        data[currentMonth] = {
          purchased: {quantity: drugOrder.quantityReceived, value: drugOrder.cost},
          dispensed: {quantity: 0, value: 0}
        };
      }
    });

    drugDispense.map((dispense)=>{
      //get month from when dispense was recorded in DB...
      // check if month is present in response data structure...
        // Yes: update quantity and value for that month...
        // No: add to data with initial quantity and value...
      const currentMonth = dispense.created_at.getUTCMonth();
      if(currentMonth in data){
        data[currentMonth].dispensed.quantity = parseInt(dispense.quantity.toString());
        data[currentMonth].dispensed.value = parseInt(dispense.dispenseValue.toString());
      }else{
        data[currentMonth] = {
          dispensed: {quantity: parseInt(dispense.quantity.toString()), value: parseInt(dispense.dispenseValue.toString())}
        }
      }
    });
    return await data;
  }

  async findDrugOrders(drugId: string){
    const drugOrders = await this.drugOrderService.findDrugOrders(drugId);
    return drugOrders;
  }

  async findDrugDistributors(drugId: string){
    const drugDistributors = await this.drugDistributorService.findOne(drugId);
    
    const distributorData = await Promise.all(drugDistributors.map(async (drugDistributor)=>{
      // get distributors data from distributor IDs...
      const distributor = await this.distributorService.findOneById(drugDistributor.distributorId);

      return {...drugDistributor, ...distributor};
    }));

    return await distributorData;
  }

  async findDrugStock (drugId:string){
    return await this.stockService.findDrugStock(drugId);
  }

  async insertMany (objectDto: Drug[]){
    const savedData = await this.drugRepository.insertMany(objectDto);
    return savedData;
  }
}

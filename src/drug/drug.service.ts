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

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: MongoRepository<Drug>,
    private drugOrderService: DrugOrderService,
    private drugDistributorService: DrugDistributorService,
    private distributorService: DistributorService,
    private stockService: StockService,
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

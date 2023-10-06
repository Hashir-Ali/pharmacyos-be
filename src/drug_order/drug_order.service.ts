import { DrugDistributorService } from './../drug_distributor/drug_distributor.service';
import { DistributorService } from './../distributor/distributor.service';
import { CreateDrugOrderDto } from './dto/create-drug_order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DrugOrder } from './entities/drug_order.entity';
import { UsersService } from 'src/users/users.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class DrugOrderService {
  
  constructor(
    @InjectRepository(DrugOrder)
    private DrugOrderRepository: MongoRepository<DrugOrder>,
    private UserService: UsersService,
    private DistributorService: DistributorService,
    private DrugDistributorService: DrugDistributorService
  ){}

  async create(CreateDrugOrderDto: CreateDrugOrderDto){
   return await this.DrugOrderRepository.save(CreateDrugOrderDto);
  }

  async findAll() {
    // populate distributor name using supplierId field..
    // get type from drug distributor on basis of drugId and distributorId field..
    const orders = await this.DrugOrderRepository.find();
    return await this.populateOrders(orders);
  }

  async findDrugOrders(drugId: string){
    const orders = await this.DrugOrderRepository.find({where: {drugId: drugId}});
    return await this.populateOrders(orders);
  }

  async findOne(drugId: string) {
    // populate distributor name using supplierId field..
    // get type from drug distributor on basis of drugId and distributorId field..
    // get user data from ordered by (id field of registered user)..
    const drug_order = await this.DrugOrderRepository.findOne({where: {drugId}});
    return await this.populateOrders([drug_order]);
  }

  async populateOrders(orders: DrugOrder[]){
    return await Promise.all(orders.map(async (value, index)=>{
      const distributor = await this.DistributorService.findOneById(value?.supplierId);
      const ordered_by = await this.UserService.findOne(value.ordered_by);
      const type = await this.DrugDistributorService.getType(value.drugId, value.supplierId);
      return {...value, From: distributor?.name, ordered_by: ordered_by, type: type};
    }));
  }
}

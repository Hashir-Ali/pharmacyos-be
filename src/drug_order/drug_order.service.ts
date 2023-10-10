import { DrugService } from './../drug/drug.service';
import { DrugDistributorService } from './../drug_distributor/drug_distributor.service';
import { DistributorService } from './../distributor/distributor.service';
import { CreateDrugOrderDto } from './dto/create-drug_order.dto';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DrugOrder } from './entities/drug_order.entity';
import { UsersService } from 'src/users/users.service';
import { ObjectId } from 'mongodb';
import { randomInt } from 'crypto';
import { faker } from '@faker-js/faker';
@Injectable()
export class DrugOrderService {
  
  constructor(
    @InjectRepository(DrugOrder)
    private DrugOrderRepository: MongoRepository<DrugOrder>,
    private UserService: UsersService,
    private DistributorService: DistributorService,
    private DrugDistributorService: DrugDistributorService,
    @Inject(forwardRef(()=>DrugService))
    private DrugService: DrugService,
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

  async seedDrugOrder(seedCount: number){
    const savedDto: DrugOrder[] = [];
    const distributor = await this.DistributorService.findAll();
    const drugs = await this.DrugService.findAll();
    
    for(let i=0; i<= seedCount; i++){
      const distributorId = distributor[randomInt(distributor.length -1)]._id;
      const drugId = drugs[randomInt(drugs.length - 1)]._id;

      savedDto.push({
        supplierId: distributorId,
        drugId: drugId,
        ordered_by: 'Hashir Shah', // No magical Strings... This, I know is a bad code and it smells like rotten rats.,
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
  }
}

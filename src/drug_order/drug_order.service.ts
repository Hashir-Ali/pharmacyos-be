import { CreateDrugOrderDto } from './dto/create-drug_order.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DrugOrder } from './entities/drug_order.entity';

@Injectable()
export class DrugOrderService {
  
  constructor(
    @InjectRepository(DrugOrder)
    private DrugOrderRepository: MongoRepository<DrugOrder>
  ){}

  async create(CreateDrugOrderDto: CreateDrugOrderDto){
   return await this.DrugOrderRepository.save(CreateDrugOrderDto);
  }

  findAll() {
    // populate distributor name using supplierId field..
    // get type from drug distributor on basis of drugId and distributorId field..
    return this.DrugOrderRepository.find();
  }

  async findOne(id: string) {
    // populate distributor name using supplierId field..
    // get type from drug distributor on basis of drugId and distributorId field..
    // get user data from ordered by (id field of registered user)..
    return await this.DrugOrderRepository.findOne({where: {drugId: id}}) || [];
  }
}

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

  findAll() {
    return this.DrugOrderRepository.find();
  }

  findOne(id: string) {
    return this.DrugOrderRepository.findBy({where: {drugId: id}})
  }
}

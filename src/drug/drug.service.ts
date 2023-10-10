import { DrugOrderService } from './../drug_order/drug_order.service';
import { Injectable } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Drug } from './entities/drug.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: MongoRepository<Drug>,
    private drugOrderService: DrugOrderService
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
    return {...Drug, orders: drugOrders};
  }

  async insertMany (objectDto: Drug[]){
    const savedData = await this.drugRepository.insertMany(objectDto);
    return savedData;
  }
}

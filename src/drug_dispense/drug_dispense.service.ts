import { DrugService } from './../drug/drug.service';
import { Injectable } from '@nestjs/common';
import { CreateDrugDispenseDto } from './dto/create-drug_dispense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDispense } from './entities/drug_dispense.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { randomInt } from 'crypto';
import { faker } from '@faker-js/faker';

@Injectable()
export class DrugDispenseService {
  constructor(
    @InjectRepository(DrugDispense)
    private drugDispenseRepo: MongoRepository<DrugDispense>,
    private DrugService: DrugService,
  ){}


  async create(CreateDrugDispenseDto: CreateDrugDispenseDto){
    return await this.drugDispenseRepo.save(CreateDrugDispenseDto);
  }

  findAll() {
    return this.drugDispenseRepo.find();
  }

  async findOne(id: string) {
    return await this.drugDispenseRepo.findOne({where: {drugId: new ObjectId(id)}}) || [];
  }

  async seedDrugDispense(seedCount: number){
    const objectDto: CreateDrugDispenseDto[] = [];
    const drugs = await this.DrugService.findAll();
    const drugId = drugs[randomInt(drugs.length - 1)]._id;

    for(let i = 0; i <= seedCount; i++){
      objectDto.push({
        drugId: drugId,
        quantity: faker.finance.amount(5, 100, 0),
        dispenseValue: faker.finance.amount(1, 50, 0),
      })
    }
    const savedItems = await this.drugDispenseRepo.insertMany(objectDto);
    return savedItems;
  }
}

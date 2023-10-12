import { Injectable } from '@nestjs/common';
import { CreateDrugDispenseDto } from './dto/create-drug_dispense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDispense } from './entities/drug_dispense.entity';
import { MongoRepository, MoreThanOrEqual } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class DrugDispenseService {
  constructor(
    @InjectRepository(DrugDispense)
    private drugDispenseRepo: MongoRepository<DrugDispense>,
  ){}

  async create(CreateDrugDispenseDto: CreateDrugDispenseDto){
    return await this.drugDispenseRepo.save(CreateDrugDispenseDto);
  }

  findAll() {
    return this.drugDispenseRepo.find();
  }

  async findOne(id: string) {
    return await this.drugDispenseRepo.findOne({where: {drugId: new ObjectId(id)}});
  }

  async findDrugDispense (drugId: string){
    // get data for current year months...
    const d = new Date();
    d.setFullYear(d.getFullYear());
    return this.drugDispenseRepo.find({where: {drugId: new ObjectId(drugId), created_at: MoreThanOrEqual(d.toISOString())}});
  }

  async insertMany (objectDto: DrugDispense[]){
    const savedData = await this.drugDispenseRepo.insertMany(objectDto);
    return savedData;
  }
}

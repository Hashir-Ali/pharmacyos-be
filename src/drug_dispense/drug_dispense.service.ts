import { Injectable } from '@nestjs/common';
import { CreateDrugDispenseDto } from './dto/create-drug_dispense.dto';
import { UpdateDrugDispenseDto } from './dto/update-drug_dispense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDispense } from './entities/drug_dispense.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class DrugDispenseService {
  constructor(
    @InjectRepository(DrugDispense)
    private drugDispenseRepo: MongoRepository<DrugDispense>
  ){}

  findAll() {
    return this.drugDispenseRepo.find();
  }

  async findOne(id: string) {
    return await this.drugDispenseRepo.findOne({where: {drugId: id}}) || [];
  }
}

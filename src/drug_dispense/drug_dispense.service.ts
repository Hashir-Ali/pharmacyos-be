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

  findOne(id: string) {
    return this.drugDispenseRepo.findOneBy({where: {drugId: id}});
  }
}

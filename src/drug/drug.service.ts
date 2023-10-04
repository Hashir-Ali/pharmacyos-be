import { Injectable } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Drug } from './entities/drug.entity';

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug)
    private drugRepository: MongoRepository<Drug>,
  ){}

  // commented for later use...!
  // create(createDrugDto: CreateDrugDto) {
  //   return this.drugRepository.save(createDrugDto);
  // }

  findAll() {
    return this.drugRepository.find();
  }

  async findOne(id: string) {
    return await this.drugRepository.findOne({where: {drugId: id}}) || [];
  }
}

import { Injectable } from '@nestjs/common';
import { CreateDrugDistributorDto } from './dto/create-drug_distributor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDistributor } from './entities/drug_distributor.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class DrugDistributorService {

  constructor(
    @InjectRepository(DrugDistributor)
    private drugDistributorRepo: MongoRepository<DrugDistributor>
  ) {
    
  }

  // will be a template funtion untill required...!
  create(createDrugDistributorDto: CreateDrugDistributorDto) {
    // return this.drugDistributorRepo.save(createDrugDistributorDto);
    return 'This action adds a new drugDistributor';
  }

  findAll() {
    return this.drugDistributorRepo.find();
  }

  async findOne(id: string) {
    return await this.drugDistributorRepo.findOne({where: {drugId: id}}) || [];
  }

}

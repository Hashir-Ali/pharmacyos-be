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
  async create(createDrugDistributorDto: CreateDrugDistributorDto) {
    // return this.drugDistributorRepo.save(createDrugDistributorDto);
    return await this.drugDistributorRepo.save(createDrugDistributorDto);
  }

  findAll() {
    return this.drugDistributorRepo.find();
  }

  async findOne(drugId: string) {
    return await this.drugDistributorRepo.findOne({where: {drugId}}) || [];
  }

  async getType(drugID: string, distributorID: string): Promise<string | null>{
    const type = await this.drugDistributorRepo.findOne({where: {drugId: drugID, distributorId: distributorID} });
    if(type){
      // const {distributorId, drugDistributorId, drugId, ...result} = type;
      return type.type;
    }else{
      return null;
    }
  }

}

import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateDrugDistributorDto } from './dto/create-drug_distributor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDistributor } from './entities/drug_distributor.entity';
import { MongoRepository } from 'typeorm';
import { randomInt } from 'crypto';
import { DistributorService } from 'src/distributor/distributor.service';
import { DrugService } from 'src/drug/drug.service';

@Injectable()
export class DrugDistributorService {

  constructor(
    @InjectRepository(DrugDistributor)
    private drugDistributorRepo: MongoRepository<DrugDistributor>,
    private distributorService: DistributorService,
    @Inject(forwardRef(()=>DrugService)) //using forward ref because of circular dependencies: Need to resolve the dependencies...
    private drugService: DrugService,
  ) {}

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

  async seedDrugDistributor(seedCount: number){
    const objectDto: CreateDrugDistributorDto[] = [];
    const drugDistributorTypes = ['Preferred Supplier', "Other Supplier", "Contracted Supplier"];

    const distributor = await this.distributorService.findAll();
    const distributorId = distributor[randomInt(distributor.length -1)]._id;

    const drugs = await this.drugService.findAll();
    const drugId = drugs[randomInt(drugs.length - 1)]._id;

    for( let i = 0; i <= seedCount; i++){
      objectDto.push(
        {
          distributorId: distributorId,
          drugId: drugId,
          type: drugDistributorTypes[randomInt(2)],
          is_preferred: true
        }
      )
    }
    const savedData = await this.drugDistributorRepo.insertMany(objectDto);
    return savedData;
  }
}

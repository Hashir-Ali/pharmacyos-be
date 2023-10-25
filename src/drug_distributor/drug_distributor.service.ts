import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { DrugDistributor } from './entities/drug_distributor.entity';
import { CreateDrugDistributorDto } from './dto/create-drug_distributor.dto';
import { ObjectId } from 'mongodb';
import { SortOrder } from 'src/drug/drug.controller';
@Injectable()
export class DrugDistributorService {
  constructor(
    @InjectRepository(DrugDistributor)
    private drugDistributorRepo: MongoRepository<DrugDistributor>,
  ) {}

  // will be a template funtion untill required...!
  async create(createDrugDistributorDto: CreateDrugDistributorDto) {
    // return this.drugDistributorRepo.save(createDrugDistributorDto);
    return await this.drugDistributorRepo.save(createDrugDistributorDto);
  }

  findAll(page: string, limit: string, sort: SortOrder, filters: any = {}) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const regex = new RegExp(filters.filters, 'i');

    return this.drugDistributorRepo.findAndCount({
      where: filters.filters ? { type: { $regex: regex } } : {},
      skip: skip,
      take: parseInt(limit),
      order: { type: sort },
    });
  }

  async findOne(drugId: string) {
    return await this.drugDistributorRepo.find({
      where: { drugId: new ObjectId(drugId) },
    });
  }

  async getType(
    drugID: string | ObjectId,
    distributorID: string | ObjectId,
  ): Promise<string | null> {
    const type = await this.drugDistributorRepo.findOne({
      where: {
        drugId: new ObjectId(drugID),
        distributorId: new ObjectId(distributorID),
      },
    });
    if (type) {
      // const {distributorId, drugDistributorId, drugId, ...result} = type;
      return type.type;
    } else {
      return null;
    }
  }

  async insertMany(objectDto: DrugDistributor[]) {
    const savedData = await this.drugDistributorRepo.insertMany(objectDto);
    return savedData;
  }

  async updateAllDistributorTypes(id: string, type: string) {
    await this.drugDistributorRepo.update(new ObjectId(id), { type: type });
  }
}

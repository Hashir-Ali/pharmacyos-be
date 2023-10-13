import { Injectable } from '@nestjs/common';
import { CreateDrugDispenseDto } from './dto/create-drug_dispense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDispense } from './entities/drug_dispense.entity';
import { MongoRepository, MoreThanOrEqual } from 'typeorm';
import { ObjectId } from 'mongodb';
import { SortOrder } from 'src/drug/drug.controller';

@Injectable()
export class DrugDispenseService {
  constructor(
    @InjectRepository(DrugDispense)
    private drugDispenseRepo: MongoRepository<DrugDispense>,
  ) {}

  async create(CreateDrugDispenseDto: CreateDrugDispenseDto) {
    return await this.drugDispenseRepo.save(CreateDrugDispenseDto);
  }

  findAll(page: string, limit: string, sort: SortOrder, filters: any = {}) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const regex = new RegExp(filters.filters, 'i');

    return this.drugDispenseRepo.findAndCount({
      where: filters.filters ? { quantity: { $regex: regex } } : {},
      skip: skip,
      take: parseInt(limit),
      order: { dispenseValue: sort },
    });
  }

  async findOne(id: string) {
    return await this.drugDispenseRepo.findOne({
      where: { drugId: new ObjectId(id) },
    });
  }

  async findDrugDispense(drugId: string) {
    // get data for current year months...
    const d = new Date();
    d.setFullYear(d.getFullYear());
    return this.drugDispenseRepo.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: MoreThanOrEqual(d.toISOString()),
      },
    });
  }

  async insertMany(objectDto: DrugDispense[]) {
    const savedData = await this.drugDispenseRepo.insertMany(objectDto);
    return savedData;
  }
}

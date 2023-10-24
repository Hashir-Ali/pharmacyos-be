import { Injectable } from '@nestjs/common';
import { CreateDrugDispenseDto } from './dto/create-drug_dispense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugDispense } from './entities/drug_dispense.entity';
import { MongoRepository, MoreThanOrEqual } from 'typeorm';
import { ObjectId } from 'mongodb';
import { SortOrder } from 'src/drug/drug.controller';
import { isEqualsGreaterThanToken } from 'typescript';

export interface PassThrough {
  allTime: number;
  lastYear: number;
  fiveMonths: number;
  lastMonth: number;
  thisMonth: number;
}
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
    // d.setFullYear(d.getFullYear(), 0, 1);
    return await this.drugDispenseRepo.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: { $gte: new Date(d.getFullYear(), 0, 1) },
      },
    });
  }

  async getCurrentYearDispense(drugId: string) {
    const d = new Date();

    return await this.drugDispenseRepo.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: { $gte: new Date(d.getFullYear(), 0, 1) },
      },
    });
  }

  async insertMany(objectDto: DrugDispense[]) {
    const savedData = await this.drugDispenseRepo.insertMany(objectDto);
    return savedData;
  }

  async countAllTimeDispense(drugId) {
    const d: Date = new Date();
    const data: PassThrough = {
      allTime: 0,
      lastYear: 0,
      fiveMonths: 0,
      lastMonth: 0,
      thisMonth: 0,
    };

    const allTime = await this.drugDispenseRepo.find({
      where: { drugId: new ObjectId(drugId) },
    });

    const thisYear = await this.drugDispenseRepo.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: { $gt: new Date(d.getFullYear(), 0, 1) },
      },
    });

    const last5Months = await this.drugDispenseRepo.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: {
          $gte: new Date(d.getFullYear(), d.getMonth() - 4, 1),
          $lte: new Date(d.getFullYear(), d.getMonth(), 1),
        },
      },
    });

    const previousMonth = await this.drugDispenseRepo.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: {
          // months are zero indexed when returned..
          $gte: new Date(d.getFullYear(), d.getMonth() - 1, 1),
          $lt: new Date(d.getFullYear(), d.getMonth(), 1),
        },
      },
    });

    const thisMonth = await this.drugDispenseRepo.find({
      where: {
        drugId: new ObjectId(drugId),
        created_at: {
          $gte: new Date(d.getFullYear(), d.getMonth(), 1),
          $lt: new Date(d.getFullYear(), d.getMonth() + 1, 1),
        },
      },
    });

    data.allTime = this.countQuantity(allTime);
    data.lastYear = this.countQuantity(thisYear);
    data.fiveMonths = this.countQuantity(last5Months);
    data.lastMonth = this.countQuantity(previousMonth);
    data.thisMonth = this.countQuantity(thisMonth);

    return data;
  }

  countQuantity(data: DrugDispense[]) {
    let counter = 0;
    data.map((record) => {
      counter += parseInt(record.quantity.toString());
    });
    return counter;
  }
}

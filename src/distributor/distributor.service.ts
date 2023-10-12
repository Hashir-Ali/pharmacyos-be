import { Injectable } from '@nestjs/common';
import { CreateDistributorDto } from './dto/create-distributor.dto';
import { UpdateDistributorDto } from './dto/update-distributor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Distributor } from './entities/distributor.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { SortOrder } from 'src/drug/drug.controller';

@Injectable()
export class DistributorService {
  constructor(
    @InjectRepository(Distributor)
    private distributorRepo: MongoRepository<Distributor>,
  ) {}

  // this will be a template function, till required...!
  async create(createDistributorDto: CreateDistributorDto) {
    return await this.distributorRepo.save(createDistributorDto);
  }

  findAndCount(
    page: string,
    limit: string,
    sort: SortOrder,
    filters: any = {},
  ) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    return this.distributorRepo.findAndCount({
      where: filters.filters ? { name: filters.filters } : {},
      skip: skip,
      take: parseInt(limit),
      order: { name: sort },
    });
  }

  findAll() {
    return this.distributorRepo.find();
  }

  async findOneById(id: string | ObjectId) {
    return await this.distributorRepo.findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  async update(
    id: ObjectId | string,
    updateDistributorDto: UpdateDistributorDto,
  ) {
    return this.distributorRepo.update(id, updateDistributorDto);
  }

  async insertMany(objectDto: Distributor[]) {
    const savedData = await this.distributorRepo.insertMany(objectDto);
    return savedData;
  }
}

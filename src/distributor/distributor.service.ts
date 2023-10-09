import { Injectable } from '@nestjs/common';
import { CreateDistributorDto } from './dto/create-distributor.dto';
import { UpdateDistributorDto } from './dto/update-distributor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Distributor } from './entities/distributor.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class DistributorService {

  constructor(
    @InjectRepository(Distributor)
    private distributorRepo: MongoRepository<Distributor>
  ){}
  
  // this will be a template function, till required...!
  async create(createDistributorDto: CreateDistributorDto) {
    return await this.distributorRepo.save(createDistributorDto);
  }

  findAll() {
    return this.distributorRepo.find();
  }

  async findOneById(id: string) {
    return await this.distributorRepo.findOne({where: {_id: new ObjectId(id)}});
  }

  async update(id: ObjectId | string, updateDistributorDto: UpdateDistributorDto){
    return this.distributorRepo.update(id, updateDistributorDto);
  }
}
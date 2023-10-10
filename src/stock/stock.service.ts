import { faker } from '@faker-js/faker';
import { DrugService } from 'src/drug/drug.service';
import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { MongoRepository } from 'typeorm';
import { randomInt } from 'crypto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: MongoRepository<Stock>,
  ){}

  // commented for later use...!
  async create(createStockDto: CreateStockDto) {
    return await this.stockRepository.save(createStockDto);
  }

  findAll() {
    return this.stockRepository.find();
  }

  async findOne(id: string) {
    return await this.stockRepository.findOne({where: {drugId: id}}) || [];
  }

  async insertMany(objectDto: Stock[]){
    const savedData = await this.stockRepository.insertMany(objectDto);
    return savedData;
  }
}

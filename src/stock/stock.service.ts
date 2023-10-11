import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

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
    return await this.stockRepository.findOne({where: {_id: new ObjectId(id)}}) || [];
  }

  async findDrugStock (drugId: string){
    return await this.stockRepository.findOne({where: {drugId: new ObjectId(drugId)}}) || [];
  }

  async insertMany(objectDto: Stock[]){
    const savedData = await this.stockRepository.insertMany(objectDto);
    return savedData;
  }
}

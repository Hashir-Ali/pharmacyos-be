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
    private DrugService: DrugService
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

  async seedStock(seedCount: number){

    const objectDto: Stock[] = [];
    const drugs = await this.DrugService.findAll();
      
    for(let i = 0; i <= seedCount; i++){
      const drugId = drugs[randomInt(drugs.length - 1)]._id;
      objectDto.push(
        {
          drugId: drugId,
          stockRuleMin: faker.number.int({min: 10, max: 100}),
          stockRuleMax: faker.number.int({min: 100, max: 1000}),
          currentStock: faker.number.int({min: 50, max: 500}),
          LooseUnits: faker.number.int({min: 20, max: 65}),
          created_at: faker.date.recent(),
          Updated_at: faker.date.recent(),
          is_enabled: faker.datatype.boolean(0.75), // 0-1 : 0.75 means 75% of true boolean value...  
        }
      );
    }

    const savedStock = await this.stockRepository.insertMany(objectDto);
    return savedStock;
  }
}

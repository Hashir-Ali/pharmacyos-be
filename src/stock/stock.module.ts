import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { DrugModule } from 'src/drug/drug.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), DrugModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService]
})
export class StockModule {}
